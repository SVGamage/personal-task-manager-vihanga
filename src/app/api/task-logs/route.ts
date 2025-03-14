"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { Action } from "@prisma/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  //pagination
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "10", 10);
  const action = searchParams.get("action") as Action;

  try {
    //get task logs
    const taskLogs = await prisma.taskLog.findMany({
      where: {
        ...(action && { action }),
      },
      include: {
        task: true,
      },
      skip,
      take,
    });
    return NextResponse.json(
      {
        message: "Task logs retrieved successfully",
        data: taskLogs,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error getting the task logs", e);
    return NextResponse.json(
      {
        message: "Error getting the task logs",
      },
      { status: 500 }
    );
  }
}
