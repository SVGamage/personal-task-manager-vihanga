"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { updateTaskSchema } from "@/lib/validation/task";

//getTaskById
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //get the task by id
    const task = await prisma.task.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "Task retrived successfully",
        data: task,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error getting the task", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

//updateTask
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //parse the request body
    const body = await request.json();
    //validate the request body
    const validationResult = updateTaskSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }
    //update the task
    const updatedTask = await prisma.task.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "Task updated successfully",
        data: updatedTask,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error updating the task", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
