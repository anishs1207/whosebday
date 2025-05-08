import prisma from "@/lib/db"

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
    const currentMonth = currentDate.getMonth() + 1; // getMonth is 0-based
    const currentDay = currentDate.getDate();

    // Step 1: Fetch upcoming birthdays
    const upcomingBirthdays = await prisma.birthday.findMany({
      where: {
        userId: userId,
        OR: [
          // Birthdays later in the current year (same year, month > currentMonth)
          { month: { gt: currentMonth } },
          // Birthdays in the current month but later than or equal to today's date
          { month: currentMonth, day: { gte: currentDay } },
        ],
      },
      orderBy: [
        { month: "asc" },
        { day: "asc" },
      ],
      take: 9,
    });

    if (upcomingBirthdays.length < 9) {
      const remainingCount = 9 - upcomingBirthdays.length;

      // Step 2: Fetch birthdays before today in the current year
      const pastBirthdays = await prisma.birthday.findMany({
        where: {
          userId: userId,
          OR: [
            // Birthdays in months before the current month
            { month: { lt: currentMonth } },
            // Birthdays in the current month but before today's date
            { month: currentMonth, day: { lt: currentDay } },
          ],
        },
        orderBy: [
          { month: "asc" },
          { day: "asc" },
        ],
        take: remainingCount,
      });

      // Combine the two lists (upcoming and past birthdays)
      const allBirthdays = [...upcomingBirthdays, ...pastBirthdays];

      return Response.json({
        success: true,
        data: allBirthdays,
      });
    }

    // If there are already 9 or more upcoming birthdays
    return Response.json({
      success: true,
      data: upcomingBirthdays,
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
