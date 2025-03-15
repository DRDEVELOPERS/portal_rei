// app/api/product/[id]/route.js
export async function GET(req, { params }) {
  try {
    const product = await prisma.products.findUnique({
      where: { id: params.id },
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
