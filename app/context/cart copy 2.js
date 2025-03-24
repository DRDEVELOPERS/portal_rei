// app/context/cart.js
"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [isItemAdded, setIsItemAdded] = useState(false);
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
    // router.refresh();
  };

  const addToCart = (product) => {
    let cart = getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateLocalStorage(cart);
    isItemAddedToCart(product);
  };

  const updateQuantity = (productId, newQuantity) => {
    let cart = getCart();
    cart = cart
      .map((item) => {
        if (item.id === productId) {
          if (newQuantity < 1) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);

    updateLocalStorage(cart);
  };

  const removeFromCart = (productId) => {
    const cart = getCart().filter((item) => item.id !== productId);
    updateLocalStorage(cart);
    setIsItemAdded(false);
  };

  // const removeFromCart = (product) => {
  //   let cart = getCart().filter((item) => item.id !== product.id);
  //   updateLocalStorage(cart);
  //   isItemAddedToCart(product);
  // };

  const isItemAddedToCart = (product) => {
    const cart = getCart();
    const exists = cart.some((item) => item.id === product.id);
    setIsItemAdded(exists);
  };

  const cartCount = () => {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
  };

  const cartTotal = () => {
    return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    updateLocalStorage([]);
  };

  const exposed = {
    isItemAdded,
    getCart: () => cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    isItemAddedToCart,
    cartCount,
    cartTotal,
    clearCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = () => useContext(Context);
export default Provider;
