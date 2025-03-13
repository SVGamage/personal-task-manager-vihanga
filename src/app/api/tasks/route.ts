"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { Priority, Status } from "@prisma/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  //pagination
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "10", 10);
  //search query
  const search = searchParams.get("search");
  //filter by status and priority
  const status = searchParams.get("status") as Status;
  const priority = searchParams.get("priority") as Priority;

  try {
    //get the tasks
    const tasks = await prisma.task.findMany({
      where: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(search && {
          OR: [
            { title: { contains: search as string, mode: "insensitive" } },
            {
              description: { contains: search as string, mode: "insensitive" },
            },
          ],
        }),
      },
      skip,
      take,
    });
    return NextResponse.json({
      status: 200,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (e) {
    console.error("Error getting the tasks", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
