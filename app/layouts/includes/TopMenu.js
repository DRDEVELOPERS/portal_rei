//app/layouts/includes/TopMenu.js

"use client";

import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function TopMenu() {
  return (
    <>
      <div
        id="TopMenu"
        className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800"
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4">
          <ul
            id="TopMenuLeft"
            className="flex items-center text-sm text-primary-black dark:text-gray-300 h-12"
          ></ul>
        </div>
      </div>
    </>
  );
}
