// app/layouts/MainLayout.js
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TopMenu from "./includes/TopMenu";
import MainHeader from "./includes/MainHeader";
import SubMenu from "./includes/SubMenu";
import Footer from "./includes/Footer";
import Loading from "../components/Loading";

const MobileMenu = dynamic(() => import("./includes/MobileMenu"), {
  ssr: false,
});

export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      const res = localStorage.getItem("isLoading");
      setIsLoading(res === "true");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <Loading />}

      {/* Desktop Header */}
      <div className="hidden md:block">
        <TopMenu />
        <MainHeader />
        <SubMenu />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileMenu />
      </div>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
