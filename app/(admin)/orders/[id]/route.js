// app/api/admin/orders/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    const orders = await prisma.orders.findMany({
      where: {
        AND: [
          search && {
            OR: [
              { id: { equals: parseInt(search) || -1 } },
              { user: { name: { contains: search, mode: "insensitive" } } },
            ],
          },
          status && { status },
        ].filter(Boolean),
      },
      include: {
        user: { select: { name: true, email: true } },
        orderItem: {
          include: { product: true, combo: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
