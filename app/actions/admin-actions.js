// app/actions/admin-actions.js
"use server";

import prisma from "@/lib/prisma";

export async function deleteProduct(productId) {
  try {
    await prisma.products.delete({
      where: { id: Number(productId) },
    });
  } catch (error) {
    throw new Error("Failed to delete product");
  }
}
