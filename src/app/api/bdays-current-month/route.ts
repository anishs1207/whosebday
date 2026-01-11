import prisma from "@/lib/db";

export async function GET(req: Request) {
  //done

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const month = url.searchParams.get("month");

    console.log(userId, month);

    if (!userId || !month) {
      return Response.json({
        success: false,
        message: "All Required Fields (userId & month) are not recevied",
        status: 400,
      });
    }

    const bdaysOfSpecifiedMonth = await prisma.birthday.findMany({
      where: {
        userId,
        month: parseInt(month, 10),
      },
    });

    if (!bdaysOfSpecifiedMonth || bdaysOfSpecifiedMonth.length == 0) {
      return Response.json({
        success: true,
        message: "No bdays in specified month",
        status: 200,
      });
    }

    return Response.json({
      success: true,
      message: "bdays fetched successfully",
      status: 200,
      data: bdaysOfSpecifiedMonth,
    });
  } catch (error) {
    console.log("DB Error", error);
    return Response.json({
      success: false,
      message: "DB Error: /bdays-current-month",
      status: 500,
    });
  }
}
