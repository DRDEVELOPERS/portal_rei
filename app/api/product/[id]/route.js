// app/api/product/[id]/route.js
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

    const product = await prisma.products.findUnique({
      where: { id: numericId },
      include: { reviews: true },
    });

    return product
      ? NextResponse.json(product)
      : NextResponse.json({ error: "Product not found" }, { status: 404 });
  } catch (error) {
    console.error("Product API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
