"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const getCart = () => {
    if (typeof localStorage === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart")) || [];
  };

  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItems(cart);
  };

  // New function: Check if item exists in cart
  const checkIfItemExists = (item) => {
    return cartItems.some(
      (cartItem) =>
        cartItem.id === item.id && cartItem.type === (item.type || "product")
    );
  };

  const addToCart = (product) => {
    let cart = getCart();
    const existingItem = cart.find(
      (item) =>
        item.id === product.id && item.type === (product.type || "product")
    );

    if (existingItem) {
      cart = cart.map((item) =>
        item.id === product.id && item.type === (product.type || "product")
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateLocalStorage(cart);
  };

  const updateQuantity = (productId, newQuantity, type = "product") => {
    let cart = getCart();
    cart = cart
      .map((item) => {
        if (item.id === productId && item.type === type) {
          if (newQuantity < 1) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);

    updateLocalStorage(cart);
  };

  const removeFromCart = (productId, type = "product") => {
    const cart = getCart().filter(
      (item) => !(item.id === productId && item.type === type)
    );
    updateLocalStorage(cart);
  };

  const cartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const cartTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    updateLocalStorage([]);
  };

  const exposed = {
    cartItems,
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    checkIfItemExists, // Added the new function
    cartCount,
    cartTotal,
    clearCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = () => useContext(Context);
export default Provider;
