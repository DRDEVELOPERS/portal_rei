//app/layouts/includes/TopHeader.js

"use client";

import { useEffect, useState } from "react";

export default function TopHeader() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div>
      {/* Dismissible Top Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 z-50 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-black">
              🎉 Exclusive Offer!
            </span>
            <a
              href="/special-deals"
              className="underline hover:text-yellow-800 text-sm"
            >
              Limited Time Discounts - Shop Now!
            </a>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-black hover:bg-yellow-500/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>
      )}
    </div>
  );
}
