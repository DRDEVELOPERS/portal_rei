// app/api/combo/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const combo = await prisma.combo.findUnique({
      where: { id: Number(params.id) },
      include: {
        products: {
          include: {
            product: true,
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

    return NextResponse.json(combo);
  } catch (error) {
    console.error("Combo Error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar combo", details: error.message },
      { status: 500 }
    );
  }
}
