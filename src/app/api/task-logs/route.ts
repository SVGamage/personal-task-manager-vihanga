"use server";

import { NextRequest } from "next/server";
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
    return {
      status: 200,
      message: "Task logs retrieved successfully",
      data: taskLogs,
    };
  } catch (e) {
    console.error("Error getting the task logs", e);
    return {
      status: 500,
      message: "An unexpected error occurred",
    };
  }
}
