import prisma from "@/lib/db";
import { getOrSetCache } from "@/lib/redis";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name");
  const month = url.searchParams.get("month");
  const day = url.searchParams.get("day");
  const title = url.searchParams.get("title");
  const userId = url.searchParams.get("userId");

  try {
    const whereClause: any = {};
    if (name) whereClause.name = name;
    if (month) whereClause.month = parseInt(month, 10);
    if (day) whereClause.day = parseInt(day, 10);
    if (title) whereClause.title = title;
    if (userId) whereClause.userId = userId;

    const cacheKey = `filter-bday:${userId || 'global'}:${name || 'any'}:${month || 'any'}:${day || 'any'}:${title || 'any'}`;

    const filteredBdays = await getOrSetCache(cacheKey, async () => {
      return prisma.birthday.findMany({
        where: whereClause,
      });
    }, 600); // 10 minutes cache

    if (!filteredBdays || filteredBdays.length == 0) {
      return Response.json({
        success: true,
        message: "No bdays match the required filters",
        status: 200,
      });
    }

    return Response.json({
      success: true,
      message: "Bdays fetched successfully",
      status: 200,
      data: filteredBdays,
    });
  } catch (error) {
    console.log("DB Error: /filter-birthday", error);

    return Response.json({
      success: false,
      message: "DB Error",
      status: 500,
    });
  }
}
