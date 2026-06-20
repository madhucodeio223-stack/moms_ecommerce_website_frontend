'use client';

import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const subscriptionData: Record<string, {
  name: string;
  stage: string;
  price: number;
  comparePrice: number;
  description: string;
  image: string;
  popular: boolean;
  items: string[];
  features: string[];
}> = {
  'first-trimester': {
    name: 'First Trimester Box',
    stage: 'Weeks 1-12',
    price: 89,
    comparePrice: 120,
    description: 'Essential vitamins, wellness products, and educational guides for early pregnancy.',
    image: 'https://images.pexels.com/photos/5945798/pexels-photo-5945798.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: false,
    items: ['Prenatal Vitamins', 'Morning Sickness Relief', 'Pregnancy Journal', 'Nutrition Guide'],
    features: ['Monthly delivery', 'Pause anytime', 'Free shipping', 'Exclusive content'],
  },
  'second-trimester': {
    name: 'Second Trimester Box',
    stage: 'Weeks 13-26',
    price: 99,
    comparePrice: 135,
    description: 'Comfort products and nutrition kits for your growing bump.',
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true,
    items: ['Stretch Mark Cream', 'Maternity Pillow', 'Comfortable Loungewear', 'Nutrition Kit'],
    features: ['Monthly delivery', 'Pause anytime', 'Free shipping', 'Exclusive content', 'Priority support'],
  },
  'third-trimester': {
    name: 'Third Trimester Box',
    stage: 'Weeks 27-40',
    price: 129,
    comparePrice: 175,
    description: 'Complete hospital preparation kit for your delivery day.',
    image: 'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: false,
    items: ['Hospital Bag Set', 'Nursing Bras', 'Postpartum Essentials', 'Birth Plan Guide'],
    features: ['Monthly delivery', 'Pause anytime', 'Free shipping', 'Exclusive content'],
  },
  'newborn': {
    name: 'Newborn Box',
    stage: '0-3 months',
    price: 109,
    comparePrice: 150,
    description: 'Everything your newborn needs in their first weeks.',
    image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: false,
    items: ['Organic Diapers (Month Supply)', 'Swaddle Blankets', 'Baby Skincare Set', 'First Aid Kit'],
    features: ['Monthly delivery', 'Pause anytime', 'Free shipping', 'Exclusive content'],
  },
  'toddler': {
    name: 'Toddler Growth Box',
    stage: '1-3 years',
    price: 79,
    comparePrice: 110,
    description: 'Educational toys and development activities for curious minds.',
    image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: false,
    items: ['Educational Toys', 'Activity Cards', 'Story Books', 'Development Guide'],
    features: ['Monthly delivery', 'Pause anytime', 'Free shipping', 'Exclusive content'],
  },
};

export default function SubscriptionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params && (params as any).slug) as string | undefined;

  // If no slug provided, show a helpful message
  if (!slug) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h2 className="text-2xl font-semibold mb-4">No Plan Selected</h2>
            <p className="text-muted-foreground mb-6">Please choose a subscription plan from the plans page.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/subscriptions">
                <Button variant="outline">Back to Plans</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <AIChatWidget />
      </>
    );
  }

  const sub = subscriptionData[slug];

  // Custom handling for invalid slugs
  if (!sub) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h2 className="text-2xl font-semibold mb-4">Plan Not Found</h2>
            <p className="text-muted-foreground mb-6">We couldn't find the subscription plan you requested. It may have been removed or the URL is incorrect.</p>
            <div className="flex items-center justify-center gap-4">
              <Button onClick={() => router.push('/subscriptions')}>Back to Plans</Button>
            </div>
          </div>
        </main>
        <Footer />
        <AIChatWidget />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              {sub.popular && (
                <Badge className="absolute top-4 left-4 bg-sage text-white">Most Popular</Badge>
              )}
            </div>

            {/* Content */}
            <div>
              <Badge variant="secondary" className="mb-4">{sub.stage}</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{sub.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">{sub.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-foreground">${sub.price}</span>
                <span className="text-xl text-muted-foreground line-through">${sub.comparePrice}</span>
                <span className="text-sm text-sage font-medium">/month</span>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">What's Included</h3>
                <div className="grid gap-3">
                  {sub.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center">
                        <Check className="h-4 w-4 text-sage" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Plan Features</h3>
                <div className="flex flex-wrap gap-2">
                  {sub.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="rounded-full">{feature}</Badge>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-sage hover:bg-sage-dark text-white h-12 text-lg group"
                  onClick={() => router.push(`/checkout/${slug}`)}
                >
                  Subscribe Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 text-lg"
                  onClick={() => router.push(`/checkout/${slug}?gift=true`)}
                >
                  <Gift className="mr-2 h-5 w-5" /> Gift This Box
                </Button>
              </div>

              {/* Payment / Checkout placeholder */}
              <div className="mt-8 p-6 border border-border rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">Payment / Checkout</h4>
                <p className="text-sm text-muted-foreground">Checkout integration goes here. Integrate Stripe/Payment provider to process subscriptions.</p>
              </div>

              {/* Back link */}
              <div className="mt-6">
                <Button variant="ghost" onClick={() => router.push('/subscriptions')}>Back to Plans</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
