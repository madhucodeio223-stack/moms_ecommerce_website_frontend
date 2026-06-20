'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { formatINR, toINRApproxFromUSD } from '@/lib/currency';
import { Gift, Sparkles, Check, ArrowRight, Pause, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use_toast';

const subscriptionBoxes = [
  {
    id: 'first-trimester',
    title: 'First Trimester Box',
    stage: 'Weeks 1-12',
    price: 89,
    originalPrice: 120,
    description: 'Essential vitamins, wellness products, and educational guides for early pregnancy.',
    items: ['Prenatal Vitamins', 'Morning Sickness Relief', 'Pregnancy Journal', 'Nutrition Guide'],
    popular: false,
    color: 'border-dusty/30',
    badge: 'bg-dusty/20 text-dusty-dark',
    image: 'https://images.pexels.com/photos/5945798/pexels-photo-5945798.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'second-trimester',
    title: 'Second Trimester Box',
    stage: 'Weeks 13-26',
    price: 99,
    originalPrice: 135,
    description: 'Comfort products and nutrition kits for your growing bump.',
    items: ['Stretch Mark Cream', 'Maternity Pillow', 'Comfortable Loungewear', 'Nutrition Kit'],
    popular: true,
    color: 'border-sage/50',
    badge: 'bg-sage/20 text-sage-dark',
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'third-trimester',
    title: 'Third Trimester Box',
    stage: 'Weeks 27-40',
    price: 129,
    originalPrice: 175,
    description: 'Complete hospital preparation kit for your delivery day.',
    items: ['Hospital Bag Set', 'Nursing Bras', 'Postpartum Essentials', 'Birth Plan Guide'],
    popular: false,
    color: 'border-lavender/30',
    badge: 'bg-lavender/20 text-lavender',
    image: 'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'newborn',
    title: 'Newborn Box',
    stage: '0-3 months',
    price: 109,
    originalPrice: 150,
    description: 'Everything your newborn needs in their first weeks.',
    items: ['Organic Diapers (Month Supply)', 'Swaddle Blankets', 'Baby Skincare Set', 'First Aid Kit'],
    popular: false,
    color: 'border-sage-light/30',
    badge: 'bg-sage-light text-sage-dark',
    image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'toddler',
    title: 'Toddler Growth Box',
    stage: '1-3 years',
    price: 79,
    originalPrice: 110,
    description: 'Educational toys and development activities for curious minds.',
    items: ['Educational Toys', 'Activity Cards', 'Story Books', 'Development Guide'],
    popular: false,
    color: 'border-dusty-light/30',
    badge: 'bg-dusty-light text-dusty-dark',
    image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const features = [
  { icon: Pause, label: 'Pause Anytime' },
  { icon: SkipForward, label: 'Skip a Month' },
  { icon: Gift, label: 'Gift Subscriptions' },
];

export function SubscriptionSection() {
  const router = useRouter();
  const toast = useToast();

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dusty/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-medium mb-4">
            <Gift className="h-4 w-4" />
            Subscription Boxes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Curated Boxes for Every Stage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monthly boxes tailored to your journey, filled with premium products, expert guidance, and delightful surprises.
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Subscription Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {subscriptionBoxes.map((box, index) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl border-2 ${box.color} bg-card overflow-hidden transition-all duration-300 hover:shadow-soft-lg ${box.popular ? 'ring-2 ring-sage ring-offset-2' : ''}`}
            >
              {/* Popular Badge */}
              {box.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-sage text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={box.image}
                  alt={box.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <Badge className={`absolute bottom-4 left-4 ${box.badge}`}>
                  {box.stage}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title & Price */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {box.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{formatINR(toINRApproxFromUSD(box.price))}</p>
                    <p className="text-sm text-muted-foreground line-through">{formatINR(toINRApproxFromUSD(box.originalPrice))}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">
                  {box.description}
                </p>

                {/* Items List */}
                <ul className="space-y-2 mb-6">
                  {box.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-sage" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="block">
                  <Button
                    className="w-full bg-sage hover:bg-sage-dark text-white group"
                    onClick={() => {
                      try {
                        toast.toast({ title: 'Subscribed', description: `Subscribed to ${box.title}` });
                      } catch (e) {}
                      router.push(`/subscriptions/${box.id}`);
                    }}
                  >
                    Subscribe Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="outline" size="lg" className="rounded-full">
            Compare All Boxes
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full">
            Gift a Subscription
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
