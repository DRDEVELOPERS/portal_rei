import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all combos
export async function GET() {
  try {
    const combos = await prisma.combo.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json(combos);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno", details: error.message },
      { status: 500 }
    );
  }
}
