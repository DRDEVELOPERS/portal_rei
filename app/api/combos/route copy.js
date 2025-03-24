// app/api/combos/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const combos = await prisma.combo.findMany({
      include: {
        products: {
          include: {
            product: {
              // Include the actual product relation
              select: {
                id: true,
                title: true,
                price: true,
                url: true,
                description: true,
                category: true,
                rating: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // Transform the response structure
    const sanitizedCombos = combos.map((combo) => ({
      ...combo,
      originalPrice: Number(combo.originalPrice),
      discountedPrice: Number(combo.discountedPrice),
      products: combo.products.map((cp) => ({
        ...cp.product,
        // Include any additional combo-product relationship fields here
        comboProductId: cp.comboId, // Example of including junction table ID
        // Map to the correct image field name
      })),
    }));

    return NextResponse.json(sanitizedCombos);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch combos",
        details: error.message,
        code: error.code || "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
}
