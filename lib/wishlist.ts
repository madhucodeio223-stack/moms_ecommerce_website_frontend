export type WishlistItem = {
  id: string;
  productId: string;
  title: string;
  addedAt: string;
};

const KEY = 'moms_wishlist_v1';

export function getWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('getWishlist error', e);
    return [];
  }
}

export function saveWishlist(list: WishlistItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    // notify listeners
    try {
      window.dispatchEvent(new CustomEvent('moms_wishlist_updated'));
    } catch (e) {
      // ignore
    }
  } catch (e) {
    console.error('saveWishlist error', e);
  }
}

export function addToWishlist(item: WishlistItem) {
  const list = getWishlist();
  if (!list.find(i => i.productId === item.productId)) {
    list.push(item);
    saveWishlist(list);
  }
}

export function removeFromWishlist(productId: string) {
  const list = getWishlist().filter(i => String(i.productId) !== String(productId) && String(i.id) !== String(productId));
  saveWishlist(list);
}

export function clearWishlist() {
  saveWishlist([]);
}
