'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Award,
  Clock,
  Star,
  CheckCircle,
} from 'lucide-react';

const trustFeatures = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: '256-bit SSL encryption for all transactions',
    color: 'bg-sage/10 text-sage',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
    color: 'bg-dusty/10 text-dusty',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
    color: 'bg-lavender/10 text-lavender',
  },
  {
    icon: Award,
    title: 'Quality Certified',
    description: 'Pediatrician-approved products',
    color: 'bg-sage-light text-sage-dark',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Expert help whenever you need',
    color: 'bg-dusty-light text-dusty-dark',
  },
  {
    icon: Heart,
    title: 'Trusted by Moms',
    description: '100,000+ happy customers',
    color: 'bg-beige text-sage-dark',
  },
];

const stats = [
  { label: 'Happy Mothers', value: '100,000+' },
  { label: 'Products Sold', value: '500,000+' },
  { label: 'Expert Consultations', value: '50,000+' },
  { label: 'Countries Served', value: '25+' },
];

const certifications = [
  'FDA Approved Ingredients',
  'BPA Free Products',
  'Organic Certified',
  'Dermatologically Tested',
  'Pediatrician Recommended',
  'Eco-Friendly Packaging',
];

export function TrustSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            Our Promise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built on Trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your safety and satisfaction are our top priorities. Here's how we ensure quality at every step.
          </p>
        </motion.div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-soft transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sage to-sage-dark rounded-3xl p-8 lg:p-12 mb-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Our Certifications & Standards
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border"
              >
                <CheckCircle className="h-4 w-4 text-sage" />
                <span className="text-sm font-medium text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              quote: "MamaNest has been my go-to throughout my pregnancy. The products are premium quality and the expert consultations gave me peace of mind.",
              author: "Rachel Thompson",
              role: "New Mom",
              rating: 5,
            },
            {
              quote: "The subscription boxes are amazing! Every month felt like a gift to myself during my pregnancy journey.",
              author: "Sophie Martinez",
              role: "Second-time Mom",
              rating: 5,
            },
            {
              quote: "The community forums helped me so much. Knowing other moms were going through the same things made all the difference.",
              author: "Jennifer Lee",
              role: "Mom of 2",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-foreground mb-4 line-clamp-3">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-light to-dusty-light" />
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
