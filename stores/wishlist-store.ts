import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WishlistItem = {
  id: string;
  productId?: string;
  title: string;
  image?: string;
  description?: string;
  price?: number;
  addedAt?: string;
};

type WishlistState = {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (idOrProductId: string) => void;
  toggle: (item: WishlistItem) => void;
  clear: () => void;
  has: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist((set, get) => ({
    items: [],
    add: (item) => {
      const items = get().items.slice();
      if (!items.find(i => String(i.productId) === String(item.productId) || String(i.id) === String(item.id))) {
        items.push({ ...item, addedAt: item.addedAt || new Date().toISOString() });
        set({ items });
        try { window.dispatchEvent(new CustomEvent('moms_wishlist_updated')); } catch (e) {}
      }
    },
    remove: (idOrProductId) => {
      const items = get().items.filter(i => String(i.productId) !== String(idOrProductId) && String(i.id) !== String(idOrProductId));
      set({ items });
      try { window.dispatchEvent(new CustomEvent('moms_wishlist_updated')); } catch (e) {}
    },
    toggle: (item) => {
      const items = get().items.slice();
      const exists = items.find(i => String(i.productId) === String(item.productId) || String(i.id) === String(item.id));
      if (exists) {
        set({ items: items.filter(i => !(String(i.productId) === String(item.productId) || String(i.id) === String(item.id))) });
      } else {
        items.push({ ...item, addedAt: new Date().toISOString() });
        set({ items });
      }
      try { window.dispatchEvent(new CustomEvent('moms_wishlist_updated')); } catch (e) {}
    },
    clear: () => { set({ items: [] }); try { window.dispatchEvent(new CustomEvent('moms_wishlist_updated')); } catch (e) {} },
    has: (productId) => get().items.some(i => String(i.productId) === String(productId) || String(i.id) === String(productId)),
  }), ({ name: 'moms_wishlist_store_v1', getStorage: () => localStorage } as unknown as any))
);

export default useWishlistStore;
