"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext<CartContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const CartContextProvider = ({ children }: Props) => {
  const [cartProducts, setCartProducts] = useState<any[]>([]);

  const getLocatStorage = () =>
    typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    const ls = getLocatStorage();
    if (ls) {
      const cartProducts = ls.getItem("cart");
      if (cartProducts) {
        setCartProducts(JSON.parse(cartProducts));
      }
    }
  }, []);

  const saveCartToLocalStorage = (cartProducts: any[]) => {
    const ls = getLocatStorage();
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    const ls = getLocatStorage();
    if (ls) {
      ls.removeItem("cart");
    }
  };

  function addToCart(
    product: Partial<CartProductType>,
    subPrice: number,
    size: AddonType | null = null,
    extras: AddonType[] = []
  ) {
    setCartProducts((prev) => {
      const cartProduct = { ...product, size, extras, subPrice };
      const newCartProducts = [...prev, cartProduct];
      saveCartToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  }

  const removeOneProductOutOfCart = (indexToRemove: number) => {
    setCartProducts((prev) => {
      const newCardProducts = prev.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartToLocalStorage(newCardProducts);

      return newCardProducts;
    });

    toast.success("Product removed");
  };

  console.log("cartProducts", cartProducts);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeOneProductOutOfCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
