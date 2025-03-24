// app/api/combo/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    // Properly handle dynamic parameters with await
    await Promise.resolve(); // Force async context
    const { id } = params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "ID do combo inválido" },
        { status: 400 }
      );
    }

    const comboId = Number(id);

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
                url: true,
              },
            },
          },
        },
      },
    });

    if (!combo) {
      return NextResponse.json(
        { error: "Combo não encontrado" },
        { status: 404 }
      );
    }

    // Process related IDs safely - CORRECTED VERSION
    const allRelatedIds = combo.products
      .filter((p) => p.product?.relatedIds)
      .flatMap((p) =>
        p.product.relatedIds
          .split(",")
          .map(Number)
          .filter((id) => !isNaN(id))
      )
      .filter((id, index, self) => self.indexOf(id) === index);

    return NextResponse.json({
      ...combo,
      suggestedIds: allRelatedIds,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno", details: error.message },
      { status: 500 }
    );
  }
}
