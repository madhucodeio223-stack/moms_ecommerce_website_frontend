'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { saveOrder, generateOrderId } from '@/lib/order';
import { formatINR } from '@/lib/currency';
import { getCart, clearCart, getCart as fetchCart } from '@/lib/cart';

const subscriptionData: Record<string, { name: string; stage: string; price: number }> = {
  'first-trimester': { name: 'First Trimester Box', stage: 'Weeks 1-12', price: 89 },
  'second-trimester': { name: 'Second Trimester Box', stage: 'Weeks 13-26', price: 99 },
  'third-trimester': { name: 'Third Trimester Box', stage: 'Weeks 27-40', price: 129 },
  'newborn': { name: 'Newborn Box', stage: '0-3 months', price: 109 },
  'toddler': { name: 'Toddler Growth Box', stage: '1-3 years', price: 79 },
};

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const search = useSearchParams();
  const planId = (params as any)?.plan as string | undefined;
  const giftMode = search?.get('gift') === 'true';

  const plan = planId ? subscriptionData[planId] : undefined;
  useEffect(() => {
    if (!planId || !plan) {
      router.push('/subscriptions');
    }
  }, [planId]);

  const taxRate = 0.08; // 8%

  // Customer
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Shipping
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // Gift
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');
  const [wallet, setWallet] = useState('');

  const [cartItems, setCartItems] = useState<any[]>([]);

  if (!planId || !plan) return null;

  const subtotal = plan.price;
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  useEffect(() => {
    try {
      setCartItems(fetchCart());
    } catch (e) {
      setCartItems([]);
    }
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
    if (!phone.trim()) e.phone = 'Phone is required';
    else if (!/^[0-9+\-()\s]{7,20}$/.test(phone)) e.phone = 'Invalid phone number';

    if (!address1.trim()) e.address1 = 'Address is required';
    if (!city.trim()) e.city = 'City is required';
    if (!stateVal.trim()) e.state = 'State is required';
    if (!postalCode.trim()) e.postalCode = 'Postal code is required';
    if (!country.trim()) e.country = 'Country is required';

    if (giftMode) {
      if (!recipientName.trim()) e.recipientName = 'Recipient name is required';
      if (!recipientEmail.trim()) e.recipientEmail = 'Recipient email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) e.recipientEmail = 'Invalid recipient email';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePayment() {
    const e: Record<string, string> = {};
    if (paymentMethod === 'card') {
      if (!cardName.trim()) e.cardName = 'Card holder name required';
      if (!/^[0-9]{12,19}$/.test(cardNumber.replace(/\s+/g, ''))) e.cardNumber = 'Invalid card number';
      if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) e.expiry = 'Invalid expiry (MM/YY)';
      if (!/^[0-9]{3,4}$/.test(cvv)) e.cvv = 'Invalid CVV';
    }
    if (paymentMethod === 'upi') {
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) e.upiId = 'Invalid UPI ID';
    }
    if (paymentMethod === 'netbanking') {
      if (!bank) e.bank = 'Select a bank';
    }
    if (paymentMethod === 'wallet') {
      if (!wallet) e.wallet = 'Select a wallet';
    }
    setErrors(prev => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  }

  async function handlePlaceOrder(e: any) {
    e.preventDefault();
    if (!validate()) return;
    if (!validatePayment()) return;
    setLoading(true);

    const orderId = generateOrderId();
    // determine products: cart items if present, otherwise plan
    const products = (cartItems && cartItems.length > 0)
      ? cartItems.map((c) => ({ id: c.id, title: c.title, price: c.price, qty: c.qty }))
      : [{ title: plan!.name, price: Math.round(plan!.price * 1), qty: 1 }];

    const order = {
      id: orderId,
      planId,
      planName: plan!.name,
      products,
      amount: subtotal,
      tax,
      total,
      paymentMethod,
      paymentStatus: 'Paid',
      status: 'Processing',
      customer: { fullName, email, phone },
      shipping: { address1, address2, city, state: stateVal, postalCode, country },
      gift: giftMode ? { recipientName, recipientEmail, message: giftMessage } : undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      // Save order locally (replace with API call / Supabase in production)
      saveOrder(order as any);

      // Remove purchased items from cart
      try {
        if (cartItems && cartItems.length > 0) {
          // clear cart fully for now (assumes purchase of all items)
          clearCart();
          window.dispatchEvent(new CustomEvent('moms_cart_updated'));
        }
      } catch (err) {
        console.warn('clear cart error', err);
      }

      // Simulate network latency
      setTimeout(() => {
        setLoading(false);
        router.push(`/order-success?orderId=${orderId}`);
      }, 700);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-semibold mb-6">Checkout — {plan.name}</h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <form className="lg:col-span-2 space-y-6" onSubmit={handlePlaceOrder}>
              <section className="p-4 border rounded-md">
                <h2 className="font-semibold mb-3">Customer Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm">Full Name</label>
                    <Input value={fullName} onChange={(v:any)=>setFullName(v.target.value)} aria-invalid={!!errors.fullName} />
                    {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="text-sm">Email</label>
                    <Input value={email} onChange={(v:any)=>setEmail(v.target.value)} aria-invalid={!!errors.email} />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm">Phone</label>
                    <Input value={phone} onChange={(v:any)=>setPhone(v.target.value)} aria-invalid={!!errors.phone} />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>
              </section>

              <section className="p-4 border rounded-md">
                <h2 className="font-semibold mb-3">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-sm">Address Line 1</label>
                    <Input value={address1} onChange={(v:any)=>setAddress1(v.target.value)} aria-invalid={!!errors.address1} />
                    {errors.address1 && <p className="text-sm text-red-500">{errors.address1}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm">Address Line 2</label>
                    <Input value={address2} onChange={(v:any)=>setAddress2(v.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm">City</label>
                    <Input value={city} onChange={(v:any)=>setCity(v.target.value)} aria-invalid={!!errors.city} />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-sm">State</label>
                    <Input value={stateVal} onChange={(v:any)=>setStateVal(v.target.value)} aria-invalid={!!errors.state} />
                    {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="text-sm">Postal Code</label>
                    <Input value={postalCode} onChange={(v:any)=>setPostalCode(v.target.value)} aria-invalid={!!errors.postalCode} />
                    {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
                  </div>
                  <div>
                    <label className="text-sm">Country</label>
                    <Input value={country} onChange={(v:any)=>setCountry(v.target.value)} aria-invalid={!!errors.country} />
                    {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                  </div>
                </div>
              </section>

              {giftMode && (
                <section className="p-4 border rounded-md">
                  <h2 className="font-semibold mb-3">Gift Order</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm">Recipient Name</label>
                      <Input value={recipientName} onChange={(v:any)=>setRecipientName(v.target.value)} aria-invalid={!!errors.recipientName} />
                      {errors.recipientName && <p className="text-sm text-red-500">{errors.recipientName}</p>}
                    </div>
                    <div>
                      <label className="text-sm">Recipient Email</label>
                      <Input value={recipientEmail} onChange={(v:any)=>setRecipientEmail(v.target.value)} aria-invalid={!!errors.recipientEmail} />
                      {errors.recipientEmail && <p className="text-sm text-red-500">{errors.recipientEmail}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm">Gift Message</label>
                      <Textarea value={giftMessage} onChange={(v:any)=>setGiftMessage(v.target.value)} />
                    </div>
                  </div>
                </section>
              )}

              <div className="flex items-center gap-4">
                <Button type="submit" className="bg-sage" disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</Button>
                <Button variant="outline" onClick={() => router.push(`/subscriptions/${planId}`)}>Back to Subscription</Button>
              </div>
            </form>

            <aside className="p-4 border rounded-md">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{plan.name}</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{subscriptionData[planId].stage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Payment Method</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="pay" checked={paymentMethod==='card'} onChange={()=>setPaymentMethod('card')} />
                      <span>Card</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="pay" checked={paymentMethod==='upi'} onChange={()=>setPaymentMethod('upi')} />
                      <span>UPI</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="pay" checked={paymentMethod==='netbanking'} onChange={()=>setPaymentMethod('netbanking')} />
                      <span>Net Banking</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="pay" checked={paymentMethod==='wallet'} onChange={()=>setPaymentMethod('wallet')} />
                      <span>Wallet</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="pay" checked={paymentMethod==='cod'} onChange={()=>setPaymentMethod('cod')} />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>

                  {/* Payment method details */}
                  <div className="mt-3">
                    {paymentMethod === 'card' && (
                      <div className="space-y-2">
                        <Input placeholder="Card holder name" value={cardName} onChange={(e:any)=>setCardName(e.target.value)} />
                        <Input placeholder="Card number (numbers only)" value={cardNumber} onChange={(e:any)=>setCardNumber(e.target.value)} />
                        <div className="flex gap-2">
                          <Input placeholder="MM/YY" value={expiry} onChange={(e:any)=>setExpiry(e.target.value)} />
                          <Input placeholder="CVV" value={cvv} onChange={(e:any)=>setCvv(e.target.value)} />
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'upi' && (
                      <div>
                        <Input placeholder="example@bank" value={upiId} onChange={(e:any)=>setUpiId(e.target.value)} />
                      </div>
                    )}
                    {paymentMethod === 'netbanking' && (
                      <div>
                        <select value={bank} onChange={(e:any)=>setBank(e.target.value)} className="input">
                          <option value="">Select bank</option>
                          <option value="HDFC">HDFC</option>
                          <option value="ICICI">ICICI</option>
                          <option value="SBI">SBI</option>
                          <option value="AXIS">AXIS</option>
                        </select>
                      </div>
                    )}
                    {paymentMethod === 'wallet' && (
                      <div>
                        <select value={wallet} onChange={(e:any)=>setWallet(e.target.value)} className="input">
                          <option value="">Select wallet</option>
                          <option value="Paytm">Paytm</option>
                          <option value="PhonePe">PhonePe</option>
                          <option value="GPay">GPay</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
