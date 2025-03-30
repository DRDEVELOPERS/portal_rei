// app/product/[id]/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MainLayout from "../../layouts/MainLayout";
import SimilarProducts from "../../components/SimilarProducts";
import useIsLoading from "../../../hooks/useIsLoading";
import { useCart } from "@/app/context/cart";
import { toast } from "react-toastify";
import ProductSpecs from "@/app/(consumer)/components/product/productSpecs";
import RatingStars from "@/app/(consumer)/components/product/ratingStars";
import { useViewedProductTracking } from "@/app/hooks/useViewedProducts";

export default function Product() {
  const router = useRouter();
  const cart = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useViewedProductTracking(id);

  const getProductData = async () => {
    useIsLoading(true);
    try {
      const [productRes, reviewsRes] = await Promise.all([
        fetch(`/api/product/${id}`),
        fetch(`/api/reviews/${id}`),
      ]);

      const productData = await productRes.json();
      const reviewsData = await reviewsRes.json();

      setProduct(productData);
      setReviews(reviewsData);

      if (productData.relatedIds) {
        const related = await fetch(
          `/api/products?ids=${productData.relatedIds}`
        );
        setRelatedProducts(await related.json());
      }

      cart.isItemAddedToCart(productData);
    } catch (error) {
      toast.error("Error loading product data");
    } finally {
      useIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getProductData();
  }, [id]);

  const handleCartAction = () => {
    if (cart.isItemAdded) {
      cart.removeFromCart(product.id);
      toast.info("Removido do Carrinho com sucesso!", { autoClose: 3000 });
    } else {
      cart.addToCart(product);
      toast.success("Adicionado ao carrinho", { autoClose: 3000 });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <img
              className="w-full rounded-lg h-96 object-contain"
              src={product?.url || "https://placehold.co/400"}
              alt={product.title}
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-yellow">{product.title}</h1>

            <RatingStars rating={product.rating} reviewCount={reviews.length} />

            <div className="bg-primary-yellow/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary-yellow">
                {(product.price / 100)?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
              <div className="text-sm text-yellow-600">à vista no PIX</div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleCartAction}
                className={`
                  flex-1 text-white py-3 px-8 rounded-full cursor-pointer 
                  ${
                    cart.isItemAdded
                      ? "bg-[#e9a321] hover:bg-[#bf851a]"
                      : "bg-[#3498C9] hover:bg-[#0054A0]"
                  } transition-colors duration-200 font-semibold
                `}
              >
                {cart.isItemAdded
                  ? "Remover do Carrinho"
                  : "Adicionar ao Carrinho"}
              </button>

              {cart.isItemAdded && (
                <button
                  onClick={() => router.push("/cart")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 md:px-8 rounded-full transition-colors duration-200 font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Ver Carrinho ({cart.cartCount()})
                </button>
              )}

              {/* New Orange Button */}
              <button
                onClick={() => router.push("/")}
                className={`flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-full transition-colors duration-200 font-semibold ${
                  cart.isItemAdded ? "" : "mt-4"
                }`}
              >
                {cart.isItemAdded ? "Continuar Comprando" : "Ver mais ofertas"}
              </button>
            </div>

            {/* Technical Specifications Section */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Especificações Técnicas
              </h2>
              <div className="prose max-w-none text-gray-900">
                <ProductSpecs specs={product.specs} />
              </div>
            </section>
          </div>
        </div>

        {/* Compre Junto Section */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Compre Junto</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-xl shadow-md"
                >
                  <img
                    src={product.url}
                    className="w-full h-48 object-contain mb-4"
                    alt={product.title}
                  />
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <div className="text-primary-yellow font-bold">
                    {product.price?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Descrição do Produto */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Descrição do Produto</h2>
          <div className="prose max-w-none">
            {product.description || (
              <p className="text-gray-500">
                Este produto não possui descrição detalhada. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore.
              </p>
            )}
          </div>
        </section>

        {/* Avaliações */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Avaliações do Produto ({reviews.length} opiniões)
          </h2>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <RatingStars rating={review.rating} />
                      <div className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 p-6 rounded-xl text-center">
              <p className="text-gray-600">
                Este produto ainda não possui avaliações. Seja o primeiro a
                avaliar!
              </p>
            </div>
          )}
        </section>

        <SimilarProducts />
      </div>
    </MainLayout>
  );
}
