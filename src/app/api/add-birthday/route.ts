import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { day, month, name, title, userId } = await req.json();
    console.log(day, month, name, title, userId);

    if (!day || !month || !name || !title || !userId) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "All required fields are not provided",
      });
    }

    const createdBirthday = await prisma.birthday.create({
      data: { day, month, name, title, userId },
    });

    console.log("New Birthday", createdBirthday);

    const newBirthday = await prisma.birthday.findUnique({
      where: { id: createdBirthday.id },
    });

    if (!newBirthday) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Error storing the birthday",
      });
    }

    // Invalidate caches
    try {
      const { invalidateUserCache, invalidateMonthlyCache } = await import("@/lib/redis");
      await invalidateUserCache(userId);
      await invalidateMonthlyCache(userId, month);
    } catch (cacheErr) {
      console.error("Cache invalidation error:", cacheErr);
    }

    return NextResponse.json({
      success: true,
      message: "Birthday added successfully",
      data: newBirthday,
    });
  } catch (error) {
    console.error("Error with DB while adding birthday:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
