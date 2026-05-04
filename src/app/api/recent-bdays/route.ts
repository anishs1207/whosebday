import prisma from "@/lib/db";
export const dynamic = "force-dynamic";
import { getOrSetCache } from "@/lib/redis";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return Response.json({
      success: false,
      message: "Missing UserId",
      status: 400,
    });
  }

  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const cacheKey = `recent-bdays:${userId}:${currentMonth}:${currentDay}`;

    const data = await getOrSetCache(cacheKey, async () => {
      const upcomingBirthdays = await prisma.birthday.findMany({
        where: {
          userId: userId,
          OR: [
            { month: { gt: currentMonth } },
            { month: currentMonth, day: { gte: currentDay } },
          ],
        },
        orderBy: [{ month: "asc" }, { day: "asc" }],
        take: 9,
      });

      if (upcomingBirthdays.length < 9) {
        const remainingCount = 9 - upcomingBirthdays.length;

        const pastBirthdays = await prisma.birthday.findMany({
          where: {
            userId: userId,
            OR: [
              { month: { lt: currentMonth } },
              { month: currentMonth, day: { lt: currentDay } },
            ],
          },
          orderBy: [{ month: "asc" }, { day: "asc" }],
          take: remainingCount,
        });

        return [...upcomingBirthdays, ...pastBirthdays];
      }

      return upcomingBirthdays;
    }, 3600); // 1 hour

    return Response.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Db Error : /api/recent-bdays", error);
    return Response.json({
      success: false,
      message: "DB ERROR",
      status: 500,
    });
  }
}
