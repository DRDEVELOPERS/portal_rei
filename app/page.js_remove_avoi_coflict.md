// app/page.js
"use client";

import { useEffect, useState } from "react";
import MainLayout from "./(consumer)/layouts/MainLayout";
import HeroSection from "./(consumer)/components/sections/HeroSection";
import FeaturedCategories from "./(consumer)/components/sections/FeaturedCategories";
import PromoBanner from "./(consumer)/components/sections/PromoBanner";
import FeaturedProducts from "./(consumer)/components/sections/FeaturedProducts";
import PrimeSection from "./(consumer)/components/sections/PrimeSection";
import BrandShowcase from "./(consumer)/components/sections/BrandShowcase";
import FlashDeals from "./(consumer)/components/sections/FlashDeals";
import SeasonalPromotion from "./(consumer)/components/sections/SeasonalPromotion";
import NewsletterSection from "./(consumer)/components/sections/NewsletterSection";
import InspirationGallery from "./(consumer)/components/sections/InspirationGallery";
import CategoryShowcase from "./(consumer)/components/sections/CategoryShowcase";
import useIsLoading from "./hooks/useIsLoading";
import TopHeader from "./(consumer)/layouts/includes/TopHeader";
import RecentlyViewed from "./(consumer)/components/sections/RecentlyViewed";
import ComboSection from "./(consumer)/components/sections/ComboSection";

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
        {/* <TopHeader /> */}
        <HeroSection />
        <FeaturedCategories />
        <PromoBanner />
        <FeaturedProducts products={products} />
        <PrimeSection products={products} />
        <BrandShowcase />
        <FlashDeals products={products} />
        <SeasonalPromotion />
        <ComboSection />
        <NewsletterSection />
        <InspirationGallery />
        <CategoryShowcase products={products} />
        <RecentlyViewed products={products} />
      </div>
    </MainLayout>
  );
}
