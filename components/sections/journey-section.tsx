'use client';

import { motion } from 'framer-motion';
import {
  Baby,
  Hospital,
  Heart,
  Sparkles,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const journeyStages = [
  {
    id: 'pregnancy',
    title: 'Pregnancy',
    description: 'Support from conception to delivery',
    icon: Heart,
    color: 'from-dusty to-dusty-dark',
    bg: 'bg-dusty/10',
    border: 'border-dusty/20',
    iconColor: 'text-dusty',
    weeks: 'Weeks 1-40',
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'hospital',
    title: 'Hospital & Delivery',
    description: 'Everything for your birth plan',
    icon: Hospital,
    color: 'from-sage to-sage-dark',
    bg: 'bg-sage/10',
    border: 'border-sage/20',
    iconColor: 'text-sage',
    weeks: 'Preparation',
    image: 'https://images.pexels.com/photos/2634028/pexels-photo-2634028.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'postpartum',
    title: 'Postpartum Recovery',
    description: 'Care for new mothers',
    icon: Sparkles,
    color: 'from-lavender to-lavender-dark',
    bg: 'bg-lavender/10',
    border: 'border-lavender/20',
    iconColor: 'text-lavender',
    weeks: 'Weeks 1-12',
    image: 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'newborn',
    title: 'Newborn Care',
    description: 'Essential for first weeks',
    icon: Baby,
    color: 'from-beige to-sage-light',
    bg: 'bg-beige',
    border: 'border-beige',
    iconColor: 'text-sage-dark',
    weeks: '0-3 months',
    image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'infant',
    title: 'Infant Development',
    description: 'Growing through milestones',
    icon: TrendingUp,
    color: 'from-sage-light to-sage',
    bg: 'bg-sage-light/20',
    border: 'border-sage-light/30',
    iconColor: 'text-sage',
    weeks: '3-12 months',
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'toddler',
    title: 'Toddler Growth',
    description: 'Learning and exploring',
    icon: Baby,
    color: 'from-dusty-light to-dusty',
    bg: 'bg-dusty-light/20',
    border: 'border-dusty-light/30',
    iconColor: 'text-dusty-dark',
    weeks: '1-3 years',
    image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function JourneySection() {
  return (
    <section id="journey" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--sage-light)/0.3)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,hsl(var(--dusty-light)/0.3)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-medium mb-4">
            Your Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Where Are You on Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your stage to discover personalized products, content, and support tailored just for you.
          </p>
        </motion.div>

        {/* Journey Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {journeyStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <motion.div key={stage.id} variants={cardVariants}>
                <Link href={`/stage/${stage.id}`} className="block group">
                  <div className={`relative h-64 rounded-3xl overflow-hidden border-2 ${stage.border} transition-all duration-300 hover:shadow-soft-lg`}>
                    {/* Background Image */}
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${stage.color} opacity-70`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="relative h-full p-6 flex flex-col justify-end">
                      {/* Icon & Weeks Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-10 h-10 rounded-xl ${stage.bg} flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${stage.iconColor}`} />
                        </div>
                        <span className="text-xs font-medium text-white/90 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                          {stage.weeks}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2">
                        {stage.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-white/80 mb-4">
                        {stage.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-white font-medium">
                        <span className="text-sm">Explore</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
