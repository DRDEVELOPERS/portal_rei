// components/grid/three-items.js
"use client";

import { GridTileImage } from "./tile";
import { Grid, GridItem } from "./index";
import Link from "next/link";

export function ThreeItemGridItem({ item, size, priority }) {
  return (
    <GridItem
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        href={`/product/${item.id}`}
        className="relative block aspect-square h-full w-full"
        prefetch
      >
        <GridTileImage
          src={item.url}
          // src={`${item.url}/500`}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            title: item.title,
            amount: (item.price / 100).toFixed(2),
            position: size === "full" ? "center" : "bottom",
          }}
        />
      </Link>
    </GridItem>
  );
}

export function ThreeItemGrid({ products }) {
  if (!products || products.length < 3) return null;

  const [firstProduct, secondProduct, thirdProduct] = products;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-4">
      <Grid className="gap-4 md:grid-cols-6 md:grid-rows-2">
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
        <ThreeItemGridItem size="half" item={thirdProduct} />
      </Grid>
    </section>
  );
}
