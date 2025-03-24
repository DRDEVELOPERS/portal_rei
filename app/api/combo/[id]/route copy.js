// app/api/combo/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    // Properly handle dynamic parameters
    const { id } = params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid combo ID" }, { status: 400 });
    }

    const comboId = Number(id);

    // Rest of your existing code remains the same
    const combo = await prisma.combo.findUnique({
      where: { id: comboId },
      include: {
        products: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                relatedIds: true,
              },
            },
          },
        },
      },
    });

    if (!combo) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    const allRelatedIds = combo.products.flatMap(
      (cp) => cp.product.relatedIds?.split(",").map(Number) || []
    );

    return NextResponse.json({
      ...combo,
      suggestedIds: [...new Set(allRelatedIds)],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
