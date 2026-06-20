'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { getOrder } from '@/lib/order';
import { formatINR } from '@/lib/currency';

export default function OrderSuccessPage() {
  const search = useSearchParams();
  const router = useRouter();
  const orderId = search?.get('orderId') as string | null;
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    if (!orderId) return;
    const o = getOrder(orderId);
    setOrder(o);
  }, [orderId]);

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-3xl font-semibold mb-4">Thank you for your order</h2>
          {!order && (
            <p className="text-muted-foreground mb-6">We couldn't find your order details. If you believe this is an error, please contact support.</p>
          )}

          {order && (
            <div className="space-y-4">
              <p className="text-lg">Order ID: <span className="font-mono">{order.id}</span></p>
              <p className="text-lg">Plan: <strong>{order.planName}</strong></p>
              <p className="text-lg">Payment Method: <strong>{order.paymentMethod || '—'}</strong></p>
              <p className="text-lg">Amount Paid: <strong>{formatINR(order.total || order.amount || 0)}</strong></p>
              <p className="text-lg">Order Status: <strong>{order.status || order.paymentStatus || 'Processing'}</strong></p>
              <p className="text-lg">Estimated Delivery: <strong>{new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}</strong></p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button onClick={() => router.push('/shop')}>Continue Shopping</Button>
            <Button variant="outline" onClick={() => router.push('/subscriptions')}>Back to Plans</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
