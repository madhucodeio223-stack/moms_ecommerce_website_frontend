"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import useWishlistStore from '@/stores/wishlist-store';
import useCartStore from '@/stores/cart-store';
import { formatINR } from '@/lib/currency';
import { useToast } from '@/hooks/use_toast';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const addToCart = useCartStore((s) => s.addItem || s.addItem);
  const toast = useToast();

  useEffect(() => {
    // no-op – store handles persistence and updates
  }, []);

  function handleRemove(id: string) {
    remove(id);
    toast.toast({ title: 'Removed', description: 'Removed from wishlist' });
  }

  function handleMoveToCart(item: any) {
    useCartStore.getState().addItem({ id: item.id, productId: item.productId || item.id, title: item.title, image: item.image, price: item.price || 0, qty: 1 });
    remove(item.id);
    toast.toast({ title: 'Moved to cart' });
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
          <p className="text-muted-foreground mb-8">{items.length} items saved</p>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Save items you love by clicking the heart icon.</p>
              <Link href="/shop">
                <Button className="bg-sage hover:bg-sage-dark text-white">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-card rounded-2xl border border-border overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)} className="absolute top-3 right-3 bg-white/80 hover:bg-white hover:text-destructive rounded-full">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-foreground">{item.price ? formatINR(item.price) : ''}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleMoveToCart(item)}>
                        <ShoppingCart className="h-4 w-4 mr-2" /> Move to Cart
                      </Button>
                      <Button variant="ghost" onClick={() => handleRemove(item.id)}>Remove</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
