generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Addresses {
  id         Int       @id @default(autoincrement())
  user_id    String    @unique @db.Uuid
  name       String
  address    String
  zipcode    String
  city       String
  country    String
  created_at DateTime? @default(now()) @db.Timestamptz(6)
}

model Orders {
  id         Int         @id @default(autoincrement())
  user_id    String      @db.Uuid
  stripe_id  String
  name       String
  address    String
  zipcode    String
  city       String
  country    String
  total      Int
  created_at DateTime?   @default(now()) @db.Timestamptz(6)
  orderItem  OrderItem[]
}

model OrderItem {
  id         Int       @id @default(autoincrement())
  order_id   Int
  product_id Int
  created_at DateTime? @default(now()) @db.Timestamptz(6)
  order      Orders    @relation(fields: [order_id], references: [id])
  product    Products  @relation(fields: [product_id], references: [id])
}

model Products {
  id            Int             @id @default(autoincrement())
  title         String
  description   String
  url           String
  price         Int
  category      String? // New field
  specs         Json? // New field for technical specifications
  relatedIds    String? // New field for "Compre junto" products
  rating        Float? // New field for average rating
  created_at    DateTime?       @default(now()) @db.Timestamptz(6)
  reviews       Review[]
  orderItem     OrderItem[]
  ComboProducts ComboProducts[]

  @@map("products")
}

model Review {
  id        Int       @id @default(autoincrement())
  productId Int       @map("product_id")
  userId    String    @map("user_id") @db.Uuid
  rating    Int
  comment   String?
  createdAt DateTime? @default(now()) @map("created_at") @db.Timestamptz(6)
  product   Products  @relation(fields: [productId], references: [id])

  @@map("reviews")
}

model Combo {
  id                 Int             @id @default(autoincrement())
  title              String
  description        String
  imageUrl           String          @map("image_url")
  originalPrice      Int             @map("original_price") // Stored in cents
  discountPercentage Int             @map("discount_percentage")
  createdAt          DateTime        @default(now()) @map("created_at") @db.Timestamptz(6)
  products           ComboProducts[]

  @@map("combos")
}

model ComboProducts {
  id        Int      @id @default(autoincrement())
  comboId   Int      @map("combo_id")
  productId Int      @map("product_id")
  quantity  Int      @default(1)
  combo     Combo    @relation(fields: [comboId], references: [id])
  product   Products @relation(fields: [productId], references: [id])

  @@map("combo_products")
}
