"use client";

import { createContext, useContext, useCallback, useMemo, useSyncExternalStore, ReactNode } from "react";
import { Product, CartItem } from "@/types";
import { analytics } from "@/components/Analytics";

const CART_STORAGE_KEY = "himedi_cart";
const CART_CHANGE_EVENT = "himedi-cart-change";

function readCartJson(): string {
  try {
    return localStorage.getItem(CART_STORAGE_KEY) || "[]";
  } catch {
    return "[]";
  }
}

function writeCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage might be full or unavailable
  }
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

function subscribeToCart(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

function getServerSnapshot(): string {
  return "[]";
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartJson = useSyncExternalStore(subscribeToCart, readCartJson, getServerSnapshot);
  const items: CartItem[] = useMemo(() => {
    try {
      return JSON.parse(cartJson);
    } catch {
      return [];
    }
  }, [cartJson]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const current: CartItem[] = JSON.parse(readCartJson());
    const existing = current.find((item) => item.product.id === product.id);
    const updated = existing
      ? current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...current, { product, quantity }];
    writeCart(updated);
    analytics.addToCart({ id: product.id, title: product.title, price: product.price, quantity });
  }, []);

  const removeItem = useCallback((productId: string) => {
    const current: CartItem[] = JSON.parse(readCartJson());
    writeCart(current.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const current: CartItem[] = JSON.parse(readCartJson());
    if (quantity <= 0) {
      writeCart(current.filter((item) => item.product.id !== productId));
      return;
    }
    writeCart(
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    writeCart([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
