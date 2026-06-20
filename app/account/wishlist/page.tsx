 'use client';

import { useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import useWishlistStore from '@/stores/wishlist-store';
import useCartStore from '@/stores/cart-store';
import { useToast } from '@/hooks/use_toast';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const addToCart = useCartStore((s) => s.addItem || s.addItem);
  const toast = useToast();

  useEffect(() => {
    // store-driven
  }, []);

  function handleRemove(id: string) {
    remove(id);
    toast.toast({ title: 'Removed from wishlist' });
  }

  function handleMoveToCart(item: any) {
    useCartStore.getState().addItem({ id: item.id, productId: item.productId || item.id, title: item.title, image: item.image, price: item.price || 0, qty: 1 });
    remove(item.id);
    toast.toast({ title: 'Moved to cart' });
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-semibold mb-6">Wishlist</h1>

          {items.length === 0 ? (
            <div className="bg-card p-4 rounded-md">Your wishlist is empty</div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-card p-4 rounded-md mb-2 flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleMoveToCart(item)}>Add to Cart</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleRemove(item.id)}>Remove</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
