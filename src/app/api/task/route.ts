"use server";

import { NextRequest, NextResponse } from "next/server";
import { Priority, Status } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { createTaskSchema } from "@/lib/validation/task";

//createTask
export async function POST(request: NextRequest) {
  try {
    //parse the request body
    const body = await request.json();
    //validate the request body
    const validationResult = createTaskSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }
    //create the task
    const validatedTask = validationResult.data;
    const createdTask = await prisma.task.create({
      data: {
        ...validatedTask,
        description: validatedTask.description || "",
        status: validatedTask.status as Status,
        priority: validatedTask.priority as Priority,
      },
    });
    return NextResponse.json(
      { message: "Task created successfully", data: createdTask },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error addig the tasl", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

