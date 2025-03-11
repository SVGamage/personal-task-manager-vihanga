"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    //get task log by itemId
    const taskLog = await prisma.taskLog.findUnique({
      where: {
        id: params.itemId,
      },
      include: {
        task: true,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Task log retrieved successfully",
      data: taskLog,
    });
  } catch (e) {
    console.error("Error getting the task log", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
