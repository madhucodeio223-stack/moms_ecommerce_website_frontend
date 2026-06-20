"use client";
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

import useCartStore from '@/stores/cart-store';
import { formatINR } from '@/lib/currency';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);

  const updateQuantity = (id: string | number, change: number) => {
    const key = String(id);
    if (change > 0) increment(key);
    else decrement(key);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal >= 500 ? 0 : 50; // thresholds in INR
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven&apos;t added anything yet.
              </p>
              <Link href="/shop">
                <Button className="bg-sage hover:bg-sage-dark text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-2xl border border-border p-4 flex gap-4"
                  >
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                              <h3 className="font-semibold text-foreground">
                                {item.title}
                              </h3>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            In Stock
                          </Badge>
                        </div>
                          <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(String(item.id))}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.qty}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                          {formatINR((item.price || 0) * (item.qty || 0))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-2xl border border-border p-6 h-fit sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                        {shipping === 0 ? (
                        <span className="text-sage">Free</span>
                      ) : (
                        formatINR(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">{formatINR(tax)}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-xl text-foreground">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-sage hover:bg-sage-dark text-white h-12 text-lg group mb-4">
                  Checkout
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Add {formatINR(Math.max(0, 500 - subtotal))} more for free shipping!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
