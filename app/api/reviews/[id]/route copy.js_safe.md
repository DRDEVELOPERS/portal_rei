// app/api/reviews/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    // Ensure params are awaited properly
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: { productId: numericId },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Reviews API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
