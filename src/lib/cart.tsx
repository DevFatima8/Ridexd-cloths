"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: string, color: string) => void;
  updateQuantity: (
    slug: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "Ridexd-cart-v1";

const sameLine = (a: CartItem, b: Pick<CartItem, "slug" | "size" | "color">) =>
  a.slug === b.slug && a.size === b.size && a.color === b.color;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => sameLine(p, item));
      if (existing) {
        return prev.map((p) =>
          sameLine(p, item)
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const removeItem = (slug: string, size: string, color: string) =>
    setItems((prev) => prev.filter((p) => !sameLine(p, { slug, size, color })));

  const updateQuantity = (
    slug: string,
    size: string,
    color: string,
    quantity: number
  ) =>
    setItems((prev) =>
      prev
        .map((p) =>
          sameLine(p, { slug, size, color })
            ? { ...p, quantity: Math.max(1, quantity) }
            : p
        )
        .filter((p) => p.quantity > 0)
    );

  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
    return {
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
