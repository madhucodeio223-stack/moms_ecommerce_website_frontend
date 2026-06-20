export type CartItem = {
  id: string;
  productId?: string;
  title: string;
  price: number; // in INR
  qty: number;
  image?: string;
};

const CART_KEY = 'moms_cart_v1';

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // If Zustand persist stored the full state object, it will have an `items` key
    if (Array.isArray(parsed)) return parsed as CartItem[];
    if (parsed?.items && Array.isArray(parsed.items)) return parsed.items as CartItem[];
    // Some persist versions nest under `state`
    if (parsed?.state?.items && Array.isArray(parsed.state.items)) return parsed.state.items as CartItem[];
    return [];
  } catch (e) {
    console.error('getCart', e);
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  try {
    // Save array form for compatibility and also update zustand store if present
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    try {
      // try updating zustand store directly if available
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const useCartStore = require('../stores/cart-store').default;
      if (useCartStore && typeof useCartStore.getState === 'function') {
        const add = useCartStore.getState().addItem;
        const clear = useCartStore.getState().clear;
        // replace store items by clearing and re-adding
        clear();
        items.forEach(it => add(it as any));
      }
    } catch (e) {
      // ignore if store isn't available
    }
    // notify listeners
    window.dispatchEvent(new CustomEvent('moms_cart_updated'));
  } catch (e) {
    console.error('saveCart', e);
  }
}

export function addToCart(item: CartItem) {
  const items = getCart();
  const existing = items.find(i => i.id === item.id);
  if (existing) {
    existing.qty += item.qty;
  } else {
    items.push(item);
  }
  saveCart(items);
}

export function removeFromCart(id: string) {
  const items = getCart().filter(i => i.id !== id);
  saveCart(items);
}

export function clearCart() {
  saveCart([]);
}
