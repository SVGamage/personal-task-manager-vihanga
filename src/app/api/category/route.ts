"use server";

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { createCategorySchema } from "../../../../lib/validation/category";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedResult = createCategorySchema.safeParse(body);
    if (!validatedResult.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: validatedResult.error.errors,
        },
        { status: 400 }
      );
    }
    const category = await prisma.category.create({
      data: validatedResult.data,
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
        data: category,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error creating category", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(
      {
        message: "Categories retrieved successfully",
        data: categories,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error getting the categories", e);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
