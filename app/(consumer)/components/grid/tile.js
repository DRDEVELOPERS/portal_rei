// components/grid/tile.js
"use client";

import Image from "next/image";
import clsx from "clsx";

export function GridTileImage({
  isInteractive = true,
  label,
  src,
  fill,
  sizes,
  priority = false,
  alt,
  className,
}) {
  return (
    <div
      className={clsx(
        "group relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 transition-all hover:shadow-xl border-2 border-transparent group-hover:border-primary-yellow",
        className
      )}
    >
      {src && (
        <>
          {fill ? (
            <Image
              className={clsx("object-cover", {
                "transition duration-300 ease-in-out group-hover:scale-105":
                  isInteractive,
              })}
              src={src}
              fill
              sizes={sizes}
              priority={priority}
              alt={alt}
            />
          ) : (
            <Image
              className={clsx("h-full w-full object-cover", {
                "transition duration-300 ease-in-out group-hover:scale-105":
                  isInteractive,
              })}
              src={src}
              width={500}
              height={500}
              sizes={sizes}
              priority={priority}
              alt={alt}
            />
          )}
        </>
      )}

      {label && (
        <div
          className={clsx("absolute p-4", {
            "bottom-0 left-0 right-0 bg-gradient-to-t from-primary-black/80":
              label.position === "bottom",
            "inset-0 flex items-center justify-center text-center bg-primary-black/60":
              label.position === "center",
          })}
        >
          <h3 className="text-xl font-bold text-white">{label.title}</h3>
          <p className="mt-1 text-primary-yellow font-semibold">
            R${label.amount}
          </p>
          {label.position === "bottom" && (
            <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
              <span className="line-through">
                R${(parseFloat(label.amount) * 1.2).toFixed(2)}
              </span>
              <span className="text-primary-yellow">20% OFF</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
