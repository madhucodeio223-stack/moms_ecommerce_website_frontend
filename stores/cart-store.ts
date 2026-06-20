import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  productId?: string;
  title: string;
  image?: string;
  price: number; // INR or display value
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  totalCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items.slice();
        const existing = items.find((i) => String(i.id) === String(item.id) || (i.productId && item.productId && String(i.productId) === String(item.productId)));
        if (existing) {
          existing.qty += item.qty;
        } else {
          items.push({ ...item });
        }
        set({ items });
        try { window.dispatchEvent(new CustomEvent('moms_cart_updated')); } catch (e) {}
      },
      removeItem: (id) => {
        const items = get().items.filter(i => String(i.id) !== String(id) && String(i.productId) !== String(id));
        set({ items });
        try { window.dispatchEvent(new CustomEvent('moms_cart_updated')); } catch (e) {}
      },
      increment: (id) => {
        const items = get().items.slice();
        const it = items.find(i => String(i.id) === String(id) || String(i.productId) === String(id));
        if (it) it.qty += 1;
        set({ items });
        try { window.dispatchEvent(new CustomEvent('moms_cart_updated')); } catch (e) {}
      },
      decrement: (id) => {
        let items = get().items.slice();
        const it = items.find(i => String(i.id) === String(id) || String(i.productId) === String(id));
        if (it) {
          it.qty = Math.max(1, it.qty - 1);
        }
        set({ items });
        try { window.dispatchEvent(new CustomEvent('moms_cart_updated')); } catch (e) {}
      },
      clear: () => {
        set({ items: [] });
        try { window.dispatchEvent(new CustomEvent('moms_cart_updated')); } catch (e) {}
      },
      totalCount: () => {
        return get().items.reduce((s, i) => s + (i.qty || 0), 0);
      }
    }),
    ({ name: 'moms_cart_v1', getStorage: () => localStorage } as unknown as any)
  )
);

export default useCartStore;
