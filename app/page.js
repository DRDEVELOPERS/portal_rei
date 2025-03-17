// app/page.js
"use client";

import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import HeroSection from "./components/sections/HeroSection";
import FeaturedCategories from "./components/sections/FeaturedCategories";
import PromoBanner from "./components/sections/PromoBanner";
import FeaturedProducts from "./components/sections/FeaturedProducts";
import PrimeSection from "./components/sections/PrimeSection";
import BrandShowcase from "./components/sections/BrandShowcase";
import FlashDeals from "./components/sections/FlashDeals";
import SeasonalPromotion from "./components/sections/SeasonalPromotion";
import NewsletterSection from "./components/sections/NewsletterSection";
import InspirationGallery from "./components/sections/InspirationGallery";
import CategoryShowcase from "./components/sections/CategoryShowcase";
import useIsLoading from "./hooks/useIsLoading";
import TopHeader from "./layouts/includes/TopHeader";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    useIsLoading(true);
    try {
      const response = await fetch("/api/products");
      const prods = await response.json();
      setProducts(prods);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      useIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <MainLayout>
      <div className="mt-12">
        <TopHeader />
        <HeroSection />
        <FeaturedCategories />
        <PromoBanner />
        <FeaturedProducts products={products} />
        <PrimeSection products={products} />
        <BrandShowcase />
        <FlashDeals products={products} />
        <SeasonalPromotion />
        <NewsletterSection />
        <InspirationGallery />
        <CategoryShowcase products={products} />
      </div>
    </MainLayout>
  );
}
