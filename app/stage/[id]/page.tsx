"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { formatINR, toINRApproxFromUSD } from '@/lib/currency';

const stageData: Record<string, {
  title: string;
  weeks: string;
  description: string;
  image: string;
  products: { name: string; price: number; image: string }[];
}> = {
  pregnancy: {
    title: 'Pregnancy',
    weeks: 'Weeks 1-40',
    description: 'Support from conception to delivery with vitamins, comfortable wear, and wellness products.',
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { name: 'Premium Prenatal Vitamins', price: 34.99, image: 'https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Maternity Support Pillow', price: 79.99, image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Stretch Mark Cream', price: 29.99, image: 'https://images.pexels.com/photos/5945798/pexels-photo-5945798.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  hospital: {
    title: 'Hospital & Delivery',
    weeks: 'Preparation',
    description: 'Everything you need for your birth plan and delivery day.',
    image: 'https://images.pexels.com/photos/2634028/pexels-photo-2634028.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { name: 'Hospital Bag Essentials', price: 149.99, image: 'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Labor & Delivery Kit', price: 89.99, image: 'https://images.pexels.com/photos/2634028/pexels-photo-2634028.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  postpartum: {
    title: 'Postpartum Recovery',
    weeks: 'Weeks 1-12',
    description: 'Care and support for new mothers during recovery.',
    image: 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { name: 'Postpartum Recovery Kit', price: 99.99, image: 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Electric Breast Pump Pro', price: 199.99, image: 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  newborn: {
    title: 'Newborn Care',
    weeks: '0-3 months',
    description: 'Essential products for your newborn\'s first weeks.',
    image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { name: 'Premium Organic Diapers', price: 34.99, image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Swaddle Blanket Set', price: 49.99, image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  infant: {
    title: 'Infant Development',
    weeks: '3-12 months',
    description: 'Products to support your baby\'s growth and milestones.',
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { name: 'Premium Travel Stroller', price: 349.99, image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Baby Food Maker', price: 129.99, image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  toddler: {
    title: 'Toddler Growth',
    weeks: '1-3 years',
    description: 'Educational toys and development activities for curious minds.',
    image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { name: 'Educational Toy Set', price: 59.99, image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Activity Cards Bundle', price: 29.99, image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
};

export default function StagePage() {
  const params = useParams();
  const stageId = params.id as string;
  const stage = stageData[stageId] || stageData.pregnancy;

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-80 overflow-hidden">
          <img
            src={stage.image}
            alt={stage.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-sage font-medium mb-2">{stage.weeks}</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {stage.title}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {stage.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Recommended Products
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stage.products.map((product) => (
                <div
                  key={product.name}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-soft transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-sage">{formatINR(toINRApproxFromUSD(product.price))}</p>
                      <Button size="sm" className="bg-sage hover:bg-sage-dark">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/shop">
                <Button variant="outline" size="lg" className="group">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
