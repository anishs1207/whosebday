import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Missing userId or email.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          id: userId,
          email,
        },
      });

      return NextResponse.json({
        success: true,
        message: "User created successfully.",
        data: newUser,
      });
    }

    return NextResponse.json({
      success: true,
      message: "User already exists.",
    });

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Server error while creating user.",
    });
  }
}
