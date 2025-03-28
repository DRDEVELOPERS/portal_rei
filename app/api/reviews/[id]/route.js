// app/api/product/[id]/route.js
export async function GET(req, { params }) {
  try {
    // First await the params promise
    const { id } = await params;

    // Then use the destructured id
    const product = await prisma.products.findUnique({
      where: { id: Number(id) }, // Convert to number if needed
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
