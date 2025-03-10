/* file: app/global.css */
@import "tailwindcss";

@plugin "@tailwindcss/typography";

@theme {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  
  --color-primary-black: #373841;
  --color-primary-yellow: #FDE037;
}

:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary-black: #373841;
  --primary-yellow: #FDE037;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #121825;
    --foreground: #ededed;
    --primary-black: #e5e7eb;
    --primary-yellow: #FDE037;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

@layer components {
  .nav-hover {
    @apply transition-colors duration-200 hover:text-primary-yellow;
  }
  .dropdown-shadow {
    @apply shadow-xl rounded-lg border border-gray-100 dark:border-gray-800;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }

  .product-grid {
    @apply mx-auto grid max-w-7xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2;
  }
  
  .product-tile {
    @apply relative block aspect-square h-full w-full overflow-hidden rounded-xl transition-all hover:shadow-xl;
  }
  
  .discount-badge {
    @apply absolute top-2 right-2 bg-primary-yellow text-primary-black px-3 py-1 rounded-full text-sm font-bold;
  }
  
  .price-label {
    @apply text-primary-yellow font-semibold text-lg;
  }
}