const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Create main products
    const product1 = await prisma.products.create({
      data: {
        title: "Esmerilhadeira Angular 4 1/2 Pol. 850W",
        description:
          "Esmerilhadeira profissional com disco de 115mm e potência de 850W",
        url: "https://cdn.diferpan.com.br/produtos/25876/25876.jpg",
        price: 28990,
        category: "Ferramentas Elétricas",
        specs: {
          marca: "Makita",
          modelo: "GA4530",
          potência: "850W",
        },
        relatedIds: "2,3",
        rating: 4.5,
      },
    });

    const product2 = await prisma.products.create({
      data: {
        title: "Jogo de Chaves Combinadas",
        description:
          "Jogo com 12 peças de chaves combinadas em aço cromo-vanádio",
        url: "https://cdn.diferpan.com.br/produtos/11850/11850.jpg",
        price: 12499,
        category: "Ferramentas Manuais",
        specs: {
          marca: "Tramontina",
          material: "Aço cromo-vanádio",
        },
        relatedIds: "1,3",
        rating: 4.2,
      },
    });

    const product3 = await prisma.products.create({
      data: {
        title: "Serra Tico-Tico 500W",
        description: "Serra tico-tico profissional com potência de 500W",
        url: "https://cdn.diferpan.com.br/produtos/25990/25990.jpg",
        price: 32900,
        category: "Ferramentas Elétricas",
        specs: {
          marca: "Bosch",
          modelo: "GST 500",
        },
        relatedIds: "1,2",
        rating: 4.7,
      },
    });

    // Create combos
    const combo1 = await prisma.combo.create({
      data: {
        title: "Kit Ferramentas Profissional",
        description: "Kit completo para trabalhos profissionais",
        imageUrl: "https://cdn.diferpan.com.br/produtos/19122/19122.jpg",
        originalPrice: 74389, // Soma dos produtos 28990 + 12499 + 32900
        discountedPrice: 60000,
        discountPercentage: 20,
        products: {
          create: [
            { product: { connect: { id: product1.id } } },
            { product: { connect: { id: product2.id } } },
            { product: { connect: { id: product3.id } } },
          ],
        },
      },
    });

    const combo2 = await prisma.combo.create({
      data: {
        title: "Kit Básico de Ferramentas",
        description: "Kit essencial para iniciantes",
        imageUrl: "https://cdn.diferpan.com.br/produtos/25060/25060.jpg",
        originalPrice: 41489, // 28990 + 12499
        discountedPrice: 35000,
        discountPercentage: 16,
        products: {
          create: [
            { product: { connect: { id: product1.id } } },
            { product: { connect: { id: product2.id } } },
          ],
        },
      },
    });

    // Create reviews
    await prisma.review.createMany({
      data: [
        {
          productId: product1.id,
          userId: "user-001",
          rating: 5,
          comment: "Excelente esmerilhadeira!",
        },
        // Valid product review only
        {
          productId: product2.id,
          userId: "user-002",
          rating: 4,
          comment: "Ótimas chaves!",
        },
      ],
    });

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
seedDatabase();
