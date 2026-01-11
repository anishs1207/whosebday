import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    const todayDay = Number(new Date().getDay());
    const todayMonth = Number(new Date().getMonth()) + 1;

    const results = await prisma.birthday.findMany({
      where: {
        day: todayDay,
        month: todayMonth,
        ...(userId ? { userId: userId } : {}),
      },
    });

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
