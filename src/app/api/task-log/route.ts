"use server";

import { NextRequest, NextResponse } from "next/server";
import { createTaskLogSchema } from "../../../../lib/validation/task-log";
import prisma from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedResult = createTaskLogSchema.safeParse(body);
    if (!validatedResult.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: validatedResult.error.errors,
        },
        { status: 400 }
      );
    }
    const validatedTaskLog = validatedResult.data;
    const createdTaskLog = await prisma.taskLog.create({
      data: {
        ...validatedTaskLog,
      },
    });
    return NextResponse.json(
      { message: "Task log created successfully", data: createdTaskLog },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error adding the task log", e);
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
