import prisma from "@/lib/db";
import { getOrSetCache } from "@/lib/redis";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    const todayDay = Number(new Date().getDay());
    const todayMonth = Number(new Date().getMonth()) + 1;

    const cacheKey = `bdays-today:${userId || 'global'}:${todayMonth}:${todayDay}`;

    const results = await getOrSetCache(cacheKey, async () => {
      return prisma.birthday.findMany({
        where: {
          day: todayDay,
          month: todayMonth,
          ...(userId ? { userId: userId } : {}),
        },
      });
    }, 3600); // cache for 1 hour

    if (!results || results.length == 0) {
      return Response.json({
        success: true,
        message: "No Bdays for Today",
        status: 200,
      });
    }

    return Response.json({
      success: true,
      messgae: "Bdays fetched successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error DB : /birthday-today", error);
    return Response.json({
      success: false,
      message: "DB Error",
      status: 500,
    });
  }
}
