// app/layouts/MainLayout.js
"use client";

import { useEffect, useState } from "react";
import TopMenu from "./includes/TopMenu";
import MainHeader from "./includes/MainHeader";
import MobileHeader from "./includes/MobileHeader";
import SubMenu from "./includes/SubMenu";
import Footer from "./includes/Footer";
import Loading from "../components/Loading";

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

      {/* Gradient Accent Bar */}
      <div className="h-5.5 bg-gradient-to-r from-yellow-400 to-yellow-300 w-full" />

      {/* Mobile Header (contains MobileMenu internally) */}
      <MobileHeader />

      {/* Desktop Header Structure */}
      <div className="hidden md:block">
        <TopMenu />
        {/* <MainHeader /> */}
        <SubMenu />
      </div>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
