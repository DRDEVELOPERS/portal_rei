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
import Modal from "@/app/components/ui/modal";

export default function Combo() {
  const router = useRouter();
  const cart = useCart();
  const { id } = useParams();
  const [combo, setCombo] = useState({});
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isItemAdded, setIsItemAdded] = useState(false);

  const getComboData = async () => {
    useIsLoading(true);
    try {
      const [comboRes, reviewsRes] = await Promise.all([
        fetch(`/api/combo/${id}`),
        fetch("/api/combos"),
        fetch(`/api/reviews/${id}`),
      ]);

      if (!comboRes.ok) throw new Error("Falha ao carregar combo");
      if (!reviewsRes.ok) throw new Error("Falha ao carregar avaliações");

      const comboData = await comboRes.json();
      const reviewsData = await reviewsRes.json();

      console.log("Dados carregados com sucesso:", {
        combo: { id: comboData.id },
        reviewsCount: reviewsData.length,
        time: `${Date.now() - startTime}ms`,
      });

      setCombo(comboData);
      setReviews(reviewsData);

      const comboProducts = comboData.products?.map((p) => p.product) || [];
      setProducts(comboProducts);
      setSelectedProduct(comboProducts[0] || null);

      // Add safety check for cart context
      if (cart?.checkIfItemExists) {
        const exists = cart.checkIfItemExists({
          id: comboData.id,
          type: "combo",
        });
        setIsItemAdded(exists);
      }

      if (comboData.suggestedIds?.length) {
        const suggestedRes = await fetch(
          `/api/products?ids=${comboData.suggestedIds.join(",")}`
        );
        if (suggestedRes.ok) {
          setSuggestedProducts(await suggestedRes.json());
        }
      }
    } catch (error) {
      toast.error(error.message || "Erro ao carregar combo");
      console.error("Combo loading error:", error);
    } finally {
      useIsLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleAddSuggested = (product) => {
    cart.addToCart(product);
    toast.success(`${product.title} adicionado ao carrinho!`);
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
        {/* Suggested Products Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-green-900">
              Aproveite e leve também!
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {suggestedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <Image
                    src={product.url || "https://placehold.co/400"}
                    alt={product.title || "Product image"}
                    width={200}
                    height={200}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                    {product.title}
                  </h4>
                  <div className="text-green-700 font-bold text-lg mb-2">
                    {(product.price / 100)?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                  <button
                    onClick={() => handleAddSuggested(product)}
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Modal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Combo Image Section with Product Grid */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 gap-6">
              {/* Main Product Image */}
              <div className="relative w-full aspect-square">
                <Image
                  src={selectedProduct?.url || "https://placehold.co/400"}
                  alt={selectedProduct?.title || "Produto selecionado"}
                  fill
                  className="w-full rounded-lg object-contain"
                />
              </div>

              {/* Product Selection Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-green-900">
                  Produtos do Combo:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        product.id === selectedProduct?.id
                          ? "bg-yellow-50 border-yellow-400"
                          : "bg-white border-gray-200 hover:border-green-500"
                      }`}
                    >
                      {product.id === selectedProduct?.id && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Selecionado
                        </div>
                      )}

                      <div className="relative w-full h-32">
                        <Image
                          src={product.url || "https://placehold.co/400"}
                          alt={product.title || "Product image"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-sm font-semibold mt-2 line-clamp-2">
                        {product.title}
                      </h4>
                      <div className="text-green-700 text-sm font-medium mt-1">
                        {(product.price / 100)?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>

                      {product.id !== selectedProduct?.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductSelect(product);
                          }}
                          className="mt-2 w-full text-sm bg-green-100 text-green-800 py-1 rounded-md hover:bg-green-200 transition-colors"
                        >
                          Trocar por este
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                onClick={async () => {
                  try {
                    const res = await fetch("/api/combos");
                    const combos = await res.json();
                    // Implement logic to show combos in modal
                    setIsModalOpen(true);
                  } catch (error) {
                    toast.error("Erro ao carregar outros combos");
                  }
                }}
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
                  <div className="text-green-700 mt-2">
                    Frete grátis para todo Brasil
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <div className="text-green-700 mt-2">
                    12x sem juros no cartão
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <div className="text-green-700 mt-2">
                    Garantia extendida de 1 ano
                  </div>
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
                    src={product.url || "https://placehold.co/400"}
                    alt={product.title || "Product image"}
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
