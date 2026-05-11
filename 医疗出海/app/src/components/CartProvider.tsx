"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useSyncExternalStore } from "react";
import { Product, CartItem, AddOn } from "@/types";
import { analytics } from "@/components/Analytics";

const CART_STORAGE_KEY = "himedi_cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage might be full or unavailable
  }
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, addOns?: AddOn[]) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return loadCartFromStorage();
  });

  // Persist to localStorage on change (skip initial hydration write)
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (isClient) {
    saveCartToStorage(items);
  }

  const addItem = useCallback((product: Product, quantity = 1, addOns: AddOn[] = []) => {
    setItems((prev) => {
      const key = product.id + (addOns.length ? "|" + addOns.map(a => a.id).sort().join(",") : "");
      const existing = prev.find((item) => {
        const eKey = item.product.id + (item.selectedAddOns?.length ? "|" + item.selectedAddOns.map(a => a.id).sort().join(",") : "");
        return eKey === key;
      });
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, selectedAddOns: addOns }];
    });
    analytics.addToCart({ id: product.id, title: product.title, price: product.price, quantity });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => {
      const addOnTotal = (item.selectedAddOns ?? []).reduce((s, a) => s + a.price, 0);
      return sum + (item.product.price + addOnTotal) * item.quantity;
    },
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
