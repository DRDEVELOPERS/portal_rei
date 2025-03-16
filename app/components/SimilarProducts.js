"use client";

import { useEffect, useState } from "react";
import ProductComp from "./Product";
import { BiLoader } from "react-icons/bi";

export default function SimilarProducts() {
  const [products, setProducts] = useState([]);

  const getRandomProducts = async () => {
    try {
      const response = await fetch("/api/products/get-random");
      const result = await response.json();

      if (result) {
        setProducts(result);
        return;
      }

      setProducts([]);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <>
      <div>
        <div className="border-b py-1 max-w-[1200px] mx-auto" />

        <div className="max-w-[1200px] mx-auto">
          <div className="text-3xl font-extrabold text-primary-black dark:text-gray-100 mb-8 animate__animated animate__fadeIn py-2 mt-4">
            Mais produtos que você vai gostar
            <span className="text-primary-yellow">.</span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductComp key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center gap-4 font-semibold">
                <BiLoader size={30} className="text-blue-400 animate-spin" />
                Carregando produtos...
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
