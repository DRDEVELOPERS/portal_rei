const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedProducts() {
  try {
    // Create main products
    const product1 = await prisma.products.create({
      data: {
        title: "Esmerilhadeira Angular 4 1/2 Pol. 850W",
        description:
          "Esmerilhadeira profissional com disco de 115mm e potência de 850W, ideal para corte e desbaste de materiais metálicos.",
        url: "https://cdn.diferpan.com.br/produtos/15541/15541.jpg",
        price: 28990, // R$ 289,90
        category: "Ferramentas Elétricas",
        specs: {
          marca: "Makita",
          modelo: "GA4530",
          voltagem: ["110V", "220V"],
          potência: "850W",
          rotação: "11.000 rpm",
          peso: "1,8 kg",
          garantia: "12 meses",
        },
        relatedIds: "2,3",
        rating: 4.5,
      },
    });

    const product2 = await prisma.products.create({
      data: {
        title: "Jogo de Chaves Combinadas",
        description:
          "Jogo com 12 peças de chaves combinadas em aço cromo-vanádio, tamanhos de 6mm a 24mm.",
        url: "https://cdn.diferpan.com.br/produtos/11850/11850.jpg",
        price: 12499, // R$ 124,99
        category: "Ferramentas Manuais",
        specs: {
          marca: "Tramontina",
          material: "Aço cromo-vanádio",
          peças: 12,
          tamanhos: "6mm a 24mm",
          garantia: "Vitalícia",
        },
        relatedIds: "1,3",
        rating: 4.2,
      },
    });

    const product3 = await prisma.products.create({
      data: {
        title: "Serra Tico-Tico 500W",
        description:
          "Serra tico-tico profissional com potência de 500W e curso de 20mm, ideal para cortes precisos em madeira.",
        url: "https://cdn.diferpan.com.br/produtos/25990/25990.jpg",
        price: 32900, // R$ 329,00
        category: "Ferramentas Elétricas",
        specs: {
          marca: "Bosch",
          modelo: "GST 500",
          potência: "500W",
          curso: "20mm",
          velocidade: "3.100 rpm",
          peso: "3,2 kg",
        },
        relatedIds: "1,2",
        rating: 4.7,
      },
    });

    // Create reviews
    await prisma.review.createMany({
      data: [
        {
          productId: product1.id,
          userId: "user-001",
          rating: 5,
          comment:
            "Excelente esmerilhadeira, potência ótima e construção robusta!",
        },
        {
          productId: product1.id,
          userId: "user-002",
          rating: 4,
          comment: "Bom produto, mas o cabo poderia ser mais ergonômico",
        },
        {
          productId: product2.id,
          userId: "user-003",
          rating: 5,
          comment: "Chaves de ótima qualidade, acabamento impecável",
        },
        {
          productId: product3.id,
          userId: "user-004",
          rating: 4,
          comment: "Precisa de mais acessórios incluídos, mas funciona bem",
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

seedProducts();
