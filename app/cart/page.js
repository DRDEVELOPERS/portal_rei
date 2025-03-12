//app/cart/page.js

"use client";

import MainLayout from "../layouts/MainLayout";
import SimilarProducts from "../components/SimilarProducts";
import CartItem from "../components/CartItem";
import { useUser } from "@/app/context/user";
import { useCart } from "@/app/context/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useIsLoading from "../hooks/useIsLoading";
import ClientOnly from "@/components/ClientOnly";
import { animateCSS } from "@/utils/animations";
import debounce from "debounce";
import { FiTruck, FiGift, FiAlertCircle } from "react-icons/fi";

export default function Cart() {
  const router = useRouter();
  const cart = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

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
      cart.emptyCart();
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <h1 className="text-4xl font-extrabold text-primary-black dark:text-gray-100 mb-8 animate__animated animate__fadeIn">
          O seu carrinho está vazio
          <span className="text-primary-yellow">.</span>
        </h1>

        <ClientOnly>
          {cart.getCart().length === 0 ? (
            <div id="emptyCart" className="text-center py-24 animate__animated">
              <div className="text-3xl mb-4">
                🛒 encontre os produtos que deseja adicionar no carrinho.
              </div>
              <button
                onClick={() => router.push("/")}
                className="bg-primary-yellow text-primary-black px-8 py-3 rounded-full 
                  font-semibold hover:bg-yellow-400 transition-colors animate__animated animate__pulse"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div
                id="cartItems"
                className="lg:col-span-2 space-y-6 animate__animated"
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

              {/* Checkout Summary */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 
                  animate__animated animate__bounceInRight"
                >
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                  {/* Progress Bar */}
                  <div className="mb-6">
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
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {cart.cartTotal() < 10000 ? (
                        <>
                          Add £{(10000 - cart.cartTotal()) / 100} more for free
                          shipping!
                        </>
                      ) : (
                        <span className="text-green-500">
                          🎉 Free shipping unlocked!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart.getCart().length} items)</span>
                      <span className="font-semibold">
                        £{(cart.cartTotal() / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <FiTruck className="text-primary-yellow" />
                        Shipping
                      </span>
                      <span className="text-green-500">Free</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <FiGift className="text-primary-yellow" />
                        Discounts
                      </span>
                      <span>-£0.00</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

                  {/* Total */}
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>£{(cart.cartTotal() / 100).toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="checkoutButton"
                    onClick={goToCheckout}
                    className="w-full bg-primary-black text-white py-4 rounded-xl font-bold
                      hover:bg-opacity-90 transition-all duration-200 animate__animated animate__pulse
                      flex items-center justify-center gap-2"
                  >
                    Secure Checkout
                  </button>

                  {/* Safety Info */}
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <FiAlertCircle className="flex-shrink-0" />
                    100% Secure Checkout · SSL Encrypted
                  </div>

                  {/* Empty Cart */}
                  <button
                    onClick={handleEmptyCart}
                    className="mt-6 text-sm text-red-500 hover:text-red-600 w-full text-center"
                  >
                    Empty Cart
                  </button>
                </div>

                {/* Promo Code */}
                <div className="mt-6 bg-primary-yellow/10 p-6 rounded-xl animate__animated animate__fadeIn">
                  <h3 className="font-semibold mb-3">Have a promo code?</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 rounded-lg px-4 py-2 border focus:ring-primary-yellow"
                    />
                    <button
                      className="bg-primary-black text-white px-6 py-2 rounded-lg
                      hover:bg-opacity-90 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ClientOnly>

        {/* Similar Products */}
        {cart.getCart().length > 0 && (
          <div className="mt-16 animate__animated animate__fadeIn">
            <SimilarProducts />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
