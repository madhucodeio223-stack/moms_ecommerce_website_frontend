'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 'maternity-wear',
    title: 'Maternity Wear',
    description: 'Comfortable and stylish clothing',
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 245,
    color: 'bg-dusty/10',
  },
  {
    id: 'supplements',
    title: 'Pregnancy Supplements',
    description: 'Essential vitamins and nutrients',
    image: 'https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 89,
    color: 'bg-sage/10',
  },
  {
    id: 'nursing',
    title: 'Nursing Essentials',
    description: 'Breast pumps and accessories',
    image: 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 156,
    color: 'bg-lavender/10',
  },
  {
    id: 'hospital-bags',
    title: 'Hospital Bags',
    description: 'Pre-packed essentials for delivery',
    image: 'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 34,
    color: 'bg-beige',
  },
  {
    id: 'baby-feeding',
    title: 'Baby Feeding',
    description: 'Bottles, formula, and more',
    image: 'https://images.pexels.com/photos/5836642/pexels-photo-5836642.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 312,
    color: 'bg-sage-light/20',
  },
  {
    id: 'diapers',
    title: 'Diapers & Care',
    description: 'Gentle care for your little one',
    image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 189,
    color: 'bg-dusty-light/20',
  },
  {
    id: 'strollers',
    title: 'Strollers',
    description: 'Premium travel systems',
    image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 67,
    color: 'bg-lavender/10',
  },
  {
    id: 'nursery',
    title: 'Nursery Essentials',
    description: 'Create the perfect space',
    image: 'https://images.pexels.com/photos/3913269/pexels-photo-3913269.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 143,
    color: 'bg-sage/10',
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-medium mb-4">
              Shop by Category
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured Categories
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sage font-medium hover:gap-3 transition-all"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/shop/${category.id}`} className="block group">
                <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden ${category.color} border border-border/50 transition-all duration-300 hover:shadow-soft-lg hover:border-sage/30`}>
                  {/* Image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                    <p className="text-xs text-white/70 mb-1">
                      {category.productCount} products
                    </p>
                    <h3 className="text-lg lg:text-xl font-semibold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-1">
                      {category.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="mt-3 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
