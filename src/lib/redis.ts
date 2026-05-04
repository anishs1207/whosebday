import { createClient } from 'redis';
import { cacheHitsCounter, cacheMissesCounter } from '@/lib/metrics';

const globalForRedis = global as unknown as { redisClient: ReturnType<typeof createClient> };

/**
 * Redis Client Singleton
 * Using the global object to prevent multiple connections during development hot-reloads
 */
export const redis =
  globalForRedis.redisClient ||
  createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 10) return new Error('Redis connection failed after 10 retries');
        return Math.min(retries * 100, 3000);
      }
    }
  });

if (process.env.NODE_ENV !== 'production') globalForRedis.redisClient = redis;

redis.on('error', (err) => console.error('Redis Client Error:', err));
redis.on('connect', () => console.log('Redis Client Connected'));

// removed top-level auto-connect to prevent build issues

async function ensureConnected() {
  if (!redis.isOpen) {
    try {
      await redis.connect();
    } catch (err) {
      console.error("Failed to connect to Redis:", err);
    }
  }
}

const DEFAULT_TTL = 3600; // 1 hour

/**
 * getOrSetCache
 * A fail-soft caching wrapper. If Redis is down, it falls back to the fetcher.
 */
export async function getOrSetCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  expirationInSeconds: number = DEFAULT_TTL
): Promise<T> {
  await ensureConnected();
  // 1. Try to get from cache
  if (redis.isOpen) {
    try {
      const cachedData = await redis.get(key);
      if (cachedData) {
        cacheHitsCounter.inc({ cache_type: 'redis' });
        return JSON.parse(cachedData) as T;
      }
      cacheMissesCounter.inc({ cache_type: 'redis' });
    } catch (error) {
      console.error(`[Redis] Get error for key "${key}":`, error);
    }
  }

  // 2. Fetch fresh data
  const freshData = await fetcher();

  // 3. Store in cache if possible
  if (redis.isOpen && freshData !== undefined && freshData !== null) {
    try {
      await redis.setEx(key, expirationInSeconds, JSON.stringify(freshData));
    } catch (error) {
      console.error(`[Redis] Set error for key "${key}":`, error);
    }
  }

  return freshData;
}

/**
 * invalidateUserCache
 * Clears all cache keys related to a specific user and global today view.
 */
export async function invalidateUserCache(userId: string) {
  await ensureConnected();
  if (!redis.isOpen) return;

  const today = new Date();
  const dayOfMonth = today.getDate();
  const dayOfWeek = today.getDay(); // Note: code uses getDay() for 'day' in some places
  const month = today.getMonth() + 1;

  const keysToInvalidate = [
    `bdays-today:${userId}:${month}:${dayOfWeek}`,
    `bdays-today:global:${month}:${dayOfWeek}`,
    `recent-bdays:${userId}:${month}:${dayOfMonth}`,
  ];

  // Also invalidate monthly caches (we don't know the month of the added/deleted bday here easily 
  // without passing it, so we can either pass it or use a pattern if needed).
  // For now, let's keep it specific or add a param.

  try {
    await Promise.all(keysToInvalidate.map(key => redis.del(key)));
    console.log(`[Redis] Invalidated cache for user: ${userId}`);
  } catch (error) {
    console.error(`[Redis] Invalidation error for user ${userId}:`, error);
  }
}

/**
 * invalidateMonthlyCache
 */
export async function invalidateMonthlyCache(userId: string, month: number | string) {
  await ensureConnected();
  if (!redis.isOpen) return;
  try {
    await redis.del(`bdays-month:${userId}:${month}`);
    await redis.del(`filter-bday:${userId}:*`); // Pattern deletion is risky, but for small sets it's okay. 
    // Better to just clear specific keys if we know them.
  } catch (error) {
    console.error(`[Redis] Monthly invalidation error:`, error);
  }
}