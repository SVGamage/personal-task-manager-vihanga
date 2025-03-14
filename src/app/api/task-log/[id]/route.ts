"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { updateTaskLogSchema } from "@/lib/validation/task-log";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskLog = await prisma.taskLog.findUnique({
      where: {
        id: params.id,
      },
      include: {
        task: true,
      },
    });
    if (!taskLog) {
      return NextResponse.json(
        { message: "TaskLog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "TaskLog retrieved successfully",
        data: taskLog,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error getting the task log", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedResult = updateTaskLogSchema.safeParse(body);
    if (!validatedResult.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: validatedResult.error.errors,
        },
        { status: 400 }
      );
    }
    const updatedTaskLog = await prisma.taskLog.update({
      where: {
        id: params.id,
      },
      data: validatedResult.data,
    });
    if (!updatedTaskLog) {
      return NextResponse.json(
        { message: "TaskLog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "TaskLog updated successfully", data: updatedTaskLog },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error updating the task log", e);
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedTaskLog = await prisma.taskLog.delete({
      where: {
        id: params.id,
      },
    });
    if (!deletedTaskLog) {
      return NextResponse.json(
        { message: "TaskLog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "TaskLog deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error deleting the task log", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
