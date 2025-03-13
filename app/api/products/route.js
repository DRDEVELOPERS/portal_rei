// app/api/products/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");

    const products = await prisma.products.findMany({
      where: ids
        ? {
            id: { in: ids.split(",").map(Number) },
          }
        : undefined,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
