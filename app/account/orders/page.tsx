'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { getAllOrders } from '@/lib/order';
import { formatINR } from '@/lib/currency';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    setOrders(getAllOrders());
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
          {orders.length === 0 ? (
            <div className="bg-card p-6 rounded-md text-center">No orders yet.</div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="bg-card p-4 rounded-md flex justify-between items-center">
                  <div>
                    <div className="font-medium">{o.planName}</div>
                    <div className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                    <div className="text-sm">{o.paymentMethod ? `Paid via ${o.paymentMethod}` : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{o.status || o.paymentStatus || 'Processing'}</div>
                    <div className="text-sm">{formatINR(o.total || o.amount || 0)}</div>
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm">Details</Button>
                      <Button variant="ghost" size="sm">Track Order</Button>
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
