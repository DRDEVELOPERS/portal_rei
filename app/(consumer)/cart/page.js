"use client";

import MainLayout from "../layouts/MainLayout";
import SimilarProducts from "../components/SimilarProducts";
import CartItem from "../components/CartItem";
import { useUser } from "@/app/context/user";
import { useCart } from "@/app/context/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useIsLoading from "../../hooks/useIsLoading";
import ClientOnly from "@/components/ClientOnly";
import { animateCSS } from "@/utils/animations";
import debounce from "debounce";
import { FiTruck, FiGift, FiAlertCircle } from "react-icons/fi";
import Modal from "../../../components/ui/modal";

export default function Cart() {
  const router = useRouter();
  const cart = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  useEffect(() => {
    useIsLoading(true);
    cart.getCart();
    cart.cartTotal();
    animateCSS("#cartItems", "fadeInUp");
    useIsLoading(false);
  }, [cart]);

  const goToCheckout = debounce(() => {
    if (!cart.cartTotal()) {
      animateCSS("#emptyCart", "shakeX");
      alert("You don't have any items in the cart.");
      return;
    }
    animateCSS("#checkoutButton", "bounceOut").then(() => {
      router.push("/checkout");
    });
  }, 300);

  const handleEmptyCart = () => {
    animateCSS("#cartItems", "flipOutX").then(() => {
      cart.clearCart();
    });
    setShowClearCartModal(false);
  };

  return (
    <MainLayout>
      <Modal
        isOpen={showClearCartModal}
        onClose={() => setShowClearCartModal(false)}
        title="Esvaziar Carrinho"
        message="Tem certeza que deseja remover todos os itens do seu carrinho?"
        onConfirm={handleEmptyCart}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 min-h-screen">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-primary-black dark:text-gray-100 mb-6 lg:mb-8 animate__animated animate__fadeIn">
          {cart.getCart().length === 0
            ? "O seu carrinho está vazio"
            : "Confira os itens no seu carrinho"}
          <span className="text-primary-yellow">.</span>
        </h1>

        <ClientOnly>
          {cart.getCart().length === 0 ? (
            <div
              id="emptyCart"
              className="text-center py-12 lg:py-24 animate__animated"
            >
              <div className="text-xl lg:text-3xl mb-4 px-4">
                🛒 encontre os produtos que deseja adicionar no carrinho.
              </div>
              <button
                onClick={() => router.push("/")}
                className="bg-primary-yellow text-primary-black px-6 lg:px-8 py-3 rounded-full 
                  font-semibold hover:bg-yellow-400 transition-colors animate__animated animate__pulse
                  text-sm lg:text-base"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items - Maintains original 2-col layout on desktop */}
              <div
                id="cartItems"
                className="lg:col-span-2 space-y-4 lg:space-y-6 animate__animated"
              >
                {cart.getCart().map((product, index) => (
                  <div
                    key={product.id}
                    className="animate__animated animate__fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CartItem
                      product={product}
                      className="hover:-translate-y-1 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>

              {/* Checkout Summary - Stacks below on mobile, sticky on desktop */}
              <div className="lg:sticky lg:top-24 h-fit mt-6 lg:mt-0">
                <div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100 dark:border-gray-700 
                  animate__animated animate__bounceInRight"
                >
                  <h2 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">
                    Resumo da Compra
                  </h2>

                  {/* Progress Bar */}
                  <div className="mb-4 lg:mb-6">
                    <div className="h-2 bg-gray-100 rounded-full mb-2">
                      <div
                        className="h-2 bg-primary-yellow rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (cart.cartTotal() / 10000) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                      {cart.cartTotal() < 10000 ? (
                        <>
                          Adicione mais R${(10000 - cart.cartTotal()) / 100}{" "}
                          para frete grátis!
                        </>
                      ) : (
                        <span className="text-green-500">
                          🎉 Frete-Grátis para todo o Brasil!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                    <div className="flex justify-between text-sm lg:text-base">
                      <span>Subtotal ({cart.getCart().length} items)</span>
                      <span className="font-semibold">
                        R${(cart.cartTotal() / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm lg:text-base">
                      <span className="flex items-center gap-2">
                        <FiTruck className="text-primary-yellow min-w-[16px]" />
                        Entrega
                      </span>
                      <span className="text-green-500">Grátis</span>
                    </div>
                    <div className="flex justify-between items-center text-sm lg:text-base">
                      <span className="flex items-center gap-2">
                        <FiGift className="text-primary-yellow min-w-[16px]" />
                        Descontos
                      </span>
                      <span>-R$0.00</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 my-4 lg:my-6" />

                  {/* Total */}
                  <div className="flex justify-between text-lg lg:text-xl font-bold mb-4 lg:mb-6">
                    <span>Total</span>
                    <span>R${(cart.cartTotal() / 100).toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="checkoutButton"
                    onClick={goToCheckout}
                    className="w-full bg-primary-black text-white py-3 lg:py-4 rounded-xl font-bold
                      hover:bg-opacity-90 transition-all duration-200 animate__animated animate__pulse
                      flex items-center justify-center gap-2 text-sm lg:text-base"
                  >
                    Compra Segura
                  </button>

                  {/* Safety Info */}
                  <div className="mt-3 lg:mt-4 text-xs lg:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <FiAlertCircle className="flex-shrink-0 min-w-[16px]" />
                    100% Secure Checkout · SSL Encrypted
                  </div>

                  {/* Empty Cart Button */}
                  <button
                    onClick={() => setShowClearCartModal(true)}
                    className="mt-4 lg:mt-6 text-xs lg:text-sm text-red-500 hover:text-red-600 w-full text-center
                      hover:underline transition-all duration-200"
                  >
                    Esvaziar Carrinho
                  </button>
                </div>

                {/* Promo Code */}
                <div className="mt-4 lg:mt-6 bg-primary-yellow/10 p-4 lg:p-6 rounded-xl animate__animated animate__fadeIn">
                  <h3 className="font-semibold mb-2 lg:mb-3 text-sm lg:text-base">
                    Tem Cupom de Desconto?
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Inserir Código"
                      className="flex-1 rounded-lg px-4 py-2 border focus:ring-primary-yellow text-sm lg:text-base"
                    />
                    <button
                      className="bg-primary-black text-white px-6 py-2 rounded-lg
                        hover:bg-opacity-90 transition-colors text-sm lg:text-base"
                    >
                      Aplicar Desconto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ClientOnly>

        {/* Similar Products */}
        {cart.getCart().length > 0 && (
          <div className="mt-8 lg:mt-16 animate__animated animate__fadeIn">
            <SimilarProducts />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
