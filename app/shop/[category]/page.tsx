'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { formatINR, toINRApproxFromUSD } from '@/lib/currency';
import { Badge } from '@/components/ui/badge';
import useCartStore from '@/stores/cart-store';
import useWishlistStore from '@/stores/wishlist-store';
import { useToast } from '@/hooks/use_toast';
import { Heart } from 'lucide-react';

const categoryData: Record<string, {
  name: string;
  description: string;
  image: string;
  products: { name: string; price: number; comparePrice?: number; image: string; badge?: string }[];
}> = {
  'maternity-wear': {
    name: 'Maternity Wear',
    description: 'Comfortable and stylish clothing for expectant mothers.',
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=800',
      products: [
      { name: 'Organic Cotton Maternity Dress', price: 79.99, comparePrice: 99.99, image: 'https://images.pexels.com/photos/4099238/pexls-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=200', badge: 'Bestseller' },
      { name: 'Maternity Leggings Set', price: 49.99, image: 'https://images.pexels.com/photos/4099238/pexls-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Nursing Friendly Blouse', price: 59.99, image: 'https://images.pexels.com/photos/4099238/pexls-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  'pregnancy-supplements': {
    name: 'Pregnancy Supplements',
    description: 'Essential vitamins and nutrients for pregnancy.',
    image: 'https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=800',
      products: [
      { name: 'Premium Prenatal Vitamins', price: 34.99, comparePrice: 44.99, image: 'https://images.pexels.com/photos/3622632/pexls-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=200', badge: 'Pediatrician Approved' },
      { name: 'DHA Omega-3 Supplement', price: 29.99, image: 'https://images.pexels.com/photos/3622632/pexls-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  'nursing-essentials': {
    name: 'Nursing Essentials',
    description: 'Breast pumps, nursing bras, and accessories.',
    image: 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=800',
      products: [
      { name: 'Electric Breast Pump Pro', price: 199.99, comparePrice: 279.99, image: 'https://images.pexels.com/photos/3913277/pexls-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=200', badge: 'Bestseller' },
      { name: 'Nursing Bra Set (3-Pack)', price: 69.99, image: 'https://images.pexels.com/photos/3913277/pexls-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  'hospital-bags': {
    name: 'Hospital Bags',
    description: 'Pre-packed essentials for delivery day.',
    image: 'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=800',
      products: [
      { name: 'Hospital Bag Essentials Kit', price: 149.99, comparePrice: 199.99, image: 'https://images.pexels.com/photos/7763942/pexls-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=200', badge: 'Popular' },
    ],
  },
  'baby-feeding': {
    name: 'Baby Feeding',
    description: 'Bottles, formula, and feeding accessories.',
    image: 'https://images.pexels.com/photos/5836642/pexels-photo-5836642.jpeg?auto=compress&cs=tinysrgb&w=800',
      products: [
      { name: 'Anti-Colic Bottle Set', price: 39.99, image: 'https://images.pexels.com/photos/5836642/pexls-photo-5836642.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Bottle warmer & Sterilizer', price: 79.99, image: 'https://images.pexels.com/photos/5836642/pexls-photo-5836642.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  'diapers-care': {
    name: 'Diapers & Care',
    description: 'Gentle care for your little one.',
    image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=800',
      products: [
      { name: 'Premium Organic Diapers (100pk)', price: 34.99, image: 'https://images.pexels.com/photos/2660034/pexls-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=200', badge: 'Organic' },
      { name: 'Baby Skincare Set', price: 49.99, image: 'https://images.pexels.com/photos/2660034/pexls-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
  'strollers': {
    name: 'Strollers',
    description: 'Premium travel systems and strollers.',
    image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=800',
      products: [
      { name: 'Premium Travel Stroller', price: 349.99, comparePrice: 449.99, image: 'https://images.pexels.com/photos/4792479/pexls-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=200', badge: 'Featured' },
    ],
  },
  'nursery': {
    name: 'Nursery Essentials',
    description: 'Create the perfect space for your baby.',
    image: 'https://images.pexels.com/photos/3913269/pexels-photo-3913269.jpeg?auto=compress&cs=tinysrgb&w=800',
      products: [
      { name: 'Crib & Mattress Set', price: 499.99, image: 'https://images.pexels.com/photos/3913269/pexls-photo-3913269.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { name: 'Nursery Decor Bundle', price: 149.99, image: 'https://images.pexels.com/photos/3913269/pexls-photo-3913269.jpeg?auto=compress&cs=tinysrgb&w=200' },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const category = categoryData[categorySlug] || Object.values(categoryData)[0];
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const toast = useToast();

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-64 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {category.name}
              </h1>
              <p className="text-white/80 mt-2">{category.description}</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <div
                  key={product.name}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-soft-lg transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-sage text-white">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-foreground">{formatINR(toINRApproxFromUSD(product.price))}</span>
                      {product.comparePrice && (
                        <span className="text-sm text-muted-foreground line-through">{formatINR(toINRApproxFromUSD(product.comparePrice))}</span>
                      )}
                    </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 w-full bg-sage hover:bg-sage-dark text-white" onClick={() => {
                            // create an id from product name
                              const id = product.name.replace(/\s+/g, '-').toLowerCase();
                              addItem({ id, productId: id, title: product.name, image: product.image, price: toINRApproxFromUSD(product.price), qty: 1 });
                            toast.toast({ title: 'Added to cart', description: `${product.name} added to cart` });
                          }}>
                            Add to Cart
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => {
                            const id = product.name.replace(/\s+/g, '-').toLowerCase();
                            toggleWishlist({ id, productId: id, title: product.name, image: product.image });
                            toast.toast({ title: 'Wishlist updated' });
                          }}>
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
