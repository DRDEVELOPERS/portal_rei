// app/api/product/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids")?.split(",").map(Number);

    if (!ids?.length) {
      return NextResponse.json(
        { error: "Invalid product IDs" },
        { status: 400 }
      );
    }

    const products = await prisma.products.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        title: true,
        price: true,
        url: true,
        description: true,
        imageUrl: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
