// app/combo/[id]/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MainLayout from "@/app/layouts/MainLayout";
import useIsLoading from "@/app/hooks/useIsLoading";
import { useCart } from "@/app/context/cart";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "@/app/components/product/ratingStars";

export default function Combo() {
  const router = useRouter();
  const cart = useCart();
  const { id } = useParams();
  const [combo, setCombo] = useState({});
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getComboData = async () => {
    useIsLoading(true);
    try {
      const [comboRes, reviewsRes] = await Promise.all([
        fetch(`/api/combo/${id}`),
        fetch(`/api/reviews/${id}`),
      ]);

      const comboData = await comboRes.json();
      const reviewsData = await reviewsRes.json();

      setCombo(comboData);
      setReviews(reviewsData);
      setProducts(comboData.products?.map((p) => p.product) || []);

      cart.checkIfItemExists(comboData);
    } catch (error) {
      toast.error("Erro ao carregar combo");
    } finally {
      useIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getComboData();
  }, [id]);

  const handleCartAction = () => {
    if (cart.isItemAdded) {
      cart.removeFromCart(combo.id);
      toast.info("Combo removido do carrinho!");
    } else {
      cart.addToCart({
        ...combo,
        type: "combo",
        price: combo.discountedPrice,
      });
      toast.success("Combo adicionado ao carrinho!");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Combo Image Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Image
              src={combo?.imageUrl || "/images/default-combo.jpg"}
              alt={combo.title}
              width={800}
              height={600}
              className="w-full rounded-lg h-96 object-contain"
            />
          </div>

          {/* Combo Details Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-green-900">{combo.title}</h1>

            <div className="bg-green-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-900">
                {(combo.discountedPrice / 100)?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                <span className="text-lg ml-2 text-green-700 line-through">
                  {(combo.originalPrice / 100)?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="text-green-700 mt-2">
                Economia de {combo.discountPercentage}%
              </div>
            </div>

            {/* Cart Actions */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleCartAction}
                className={`flex-1 text-white py-3 px-8 rounded-full cursor-pointer ${
                  cart.isItemAdded
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-green-700 hover:bg-green-800"
                } transition-colors duration-200 font-semibold`}
              >
                {cart.isItemAdded ? "Remover Combo" : "Adicionar Combo"}
              </button>

              <button
                onClick={() => router.push("/")}
                className="flex-1 bg-yellow-400 text-green-900 py-3 px-8 rounded-full hover:bg-yellow-500 transition-colors duration-200 font-semibold"
              >
                Ver Mais Combos
              </button>
            </div>

            {/* Combo Benefits */}
            <div className="mt-8 bg-green-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-900">
                Vantagens do Combo
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Frete grátis para todo Brasil
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  12x sem juros no cartão
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Garantia extendida de 1 ano
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Included Products Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Produtos Incluídos ({products.length} itens)
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <Image
                    src={product.url}
                    alt={product.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <div className="text-green-700 font-bold">
                    {(product.price / 100)?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Combo Description */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Sobre este Combo</h2>
          <div className="prose max-w-none text-gray-700">
            {combo.description || (
              <p>
                Este combo exclusivo oferece os melhores produtos com desconto
                especial. Aproveite a economia e garantia extendida!
              </p>
            )}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Avaliações do Combo ({reviews.length})
          </h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-xl shadow-md mb-4"
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
            ))
          ) : (
            <div className="bg-yellow-50 p-6 rounded-xl text-center">
              <p className="text-gray-600">
                Este combo ainda não possui avaliações. Seja o primeiro a
                avaliar!
              </p>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
