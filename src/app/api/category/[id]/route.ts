"use server";

import { NextRequest, NextResponse } from "next/server";
import { updateCategorySchema } from "../../../../../lib/validation/category";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //get category with its tasks
    const categories = await prisma.taskCategory.findMany({
      where: {
        id: params.id,
      },
      include: {
        task: true,
      },
    });
    return NextResponse.json(
      {
        message: "Category retrieved successfully",
        data: categories,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error getting the category", e);
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
    const validatedResult = updateCategorySchema.safeParse(body);
    if (!validatedResult.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: validatedResult.error.errors,
        },
        { status: 400 }
      );
    }
    const updatedCategory = await prisma.category.update({
      where: {
        id: params.id,
      },
      data: validatedResult.data,
    });
    return NextResponse.json(
      {
        message: "Category updated successfully",
        data: updatedCategory,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error updating the category", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
