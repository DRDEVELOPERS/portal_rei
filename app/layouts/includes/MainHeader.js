//app/layouts/MainLayout.js
"use client";

import debounce from "lodash/debounce";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

export default function MainLayout() {
  return (
    <div
      id="MainHeader"
      className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
    >
      <nav className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center w-full gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img
              width="120"
              src="/images/logo.svg"
              className="w-28 md:w-32"
              alt="PORTALFERRAGEM Logo"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
