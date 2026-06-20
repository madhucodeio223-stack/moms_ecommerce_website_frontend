"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Video, MessageCircle, Calendar, ArrowRight, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const experts = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    title: 'Obstetrician & Gynecologist',
    rating: 4.9,
    reviews: 324,
    experience: '15 years',
    specialties: ['High-Risk Pregnancy', 'Prenatal Care'],
    available: true,
    image: 'https://images.pexels.com/photos/4067229/pexels-photo-4067229.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 2,
    name: 'Dr. Emily Chen',
    title: 'Pediatrician',
    rating: 4.8,
    reviews: 256,
    experience: '12 years',
    specialties: ['Newborn Care', 'Development'],
    available: true,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 3,
    name: 'Jessica Williams',
    title: 'Lactation Consultant',
    rating: 5.0,
    reviews: 189,
    experience: '10 years',
    specialties: ['Breastfeeding', 'Nutrition'],
    available: false,
    image: 'https://images.pexels.com/photos/4170762/pexels-photo-4170762.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 4,
    name: 'Dr. Michael Brown',
    title: 'Child Development Expert',
    rating: 4.9,
    reviews: 142,
    experience: '18 years',
    specialties: ['Cognitive Development', 'Early Learning'],
    available: true,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const consultationFeatures = [
  {
    icon: Video,
    title: 'Video Consultations',
    description: 'Face-to-face sessions from the comfort of home',
  },
  {
    icon: MessageCircle,
    title: 'Chat Support',
    description: 'Quick answers to your questions',
  },
  {
    icon: Calendar,
    title: 'Easy Scheduling',
    description: 'Book appointments that fit your schedule',
  },
];

export function ExpertsSection() {
  const router = useRouter();

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
            <Video className="h-4 w-4" />
            Expert Consultations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Talk to Certified Experts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with obstetricians, pediatricians, lactation consultants, and child development experts for personalized guidance.
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
            {consultationFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center shadow-soft">
                    <Icon className="h-6 w-6 text-sage" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Expert Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-3xl border border-border overflow-hidden hover:shadow-soft-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Availability Badge */}
                {expert.available && (
                  <Badge className="absolute top-4 right-4 bg-sage text-white">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    Available Now
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Name & Title */}
                <h3 className="font-semibold text-foreground mb-1">
                  {expert.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {expert.title}
                </p>

                {/* Rating & Experience */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{expert.rating}</span>
                    <span className="text-xs text-muted-foreground">({expert.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {expert.experience}
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  className="w-full"
                  variant={expert.available ? 'default' : 'outline'}
                  disabled={!expert.available}
                  onClick={() => router.push(`/consult/book/${expert.id}`)}
                >
                  {expert.available ? 'Book Session' : 'View Schedule'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" className="rounded-full group">
            View All Experts
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
