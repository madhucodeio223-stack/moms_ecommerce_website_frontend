'use client';

import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Award, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const communityFeatures = [
  {
    icon: Users,
    title: "Mother's Forums",
    description: 'Connect with mothers at every stage',
  },
  {
    icon: MessageCircle,
    title: 'Due Date Groups',
    description: 'Find moms due the same month',
  },
  {
    icon: Heart,
    title: 'Success Stories',
    description: 'Share and celebrate milestones',
  },
  {
    icon: Award,
    title: 'Community Rewards',
    description: 'Earn badges and points',
  },
];

const communityPosts = [
  {
    id: 1,
    author: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/4170762/pexels-photo-4170762.jpeg?auto=compress&cs=tinysrgb&w=100',
    badge: 'Silver Member',
    title: 'My Birth Story: 40 Hours of Labor But Worth Every Minute',
    likes: 234,
    replies: 89,
    time: '2 hours ago',
    tags: ['Birth Story', 'Inspiration'],
  },
  {
    id: 2,
    author: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
    badge: 'Gold Member',
    title: 'Sleep Training Tips That Actually Worked for My 6-Month-Old',
    likes: 567,
    replies: 142,
    time: '5 hours ago',
    tags: ['Sleep Training', 'Tips'],
  },
  {
    id: 3,
    author: 'Jessica Chen',
    avatar: 'https://images.pexels.com/photos/4067229/pexels-photo-4067229.jpeg?auto=compress&cs=tinysrgb&w=100',
    badge: 'Platinum Member',
    title: 'First Trimester Survival Guide: What Helped Me Through',
    likes: 892,
    replies: 203,
    time: '1 day ago',
    tags: ['First Trimester', 'Advice'],
  },
];

const groups = [
  {
    name: 'Due September 2024',
    members: 1243,
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Newborn Care',
    members: 892,
    image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Breastfeeding Support',
    members: 674,
    image: 'https://images.pexels.com/photo/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export function CommunitySection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-dusty-light/10 via-background to-sage-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            Community
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Join 200,000+ Mothers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask questions, share experiences, and connect with mothers on the same journey as you.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border text-center hover:shadow-soft transition-all"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-sage/10 flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-sage" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Recent Posts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Trending Discussions
            </h3>
            <div className="space-y-4">
              {communityPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="p-5 rounded-2xl bg-card border border-border hover:shadow-soft transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.avatar} alt={post.author} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{post.author}</span>
                        <Badge variant="secondary" className="text-xs">
                          {post.badge}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2 hover:text-sage transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies} replies</span>
                        </div>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-6 w-full sm:w-auto group">
              View All Discussions
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Right - Groups & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Active Groups */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">Popular Groups</h3>
              <div className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.name}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-sage">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sage to-sage-dark text-white">
              <h3 className="font-semibold mb-4">Mama Rewards</h3>
              <p className="text-sm text-white/80 mb-6">
                Earn points and badges for being an active community member
              </p>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <Star className="h-6 w-6 mx-auto mb-1 text-yellow-300" />
                  <p className="text-2xl font-bold">Silver</p>
                  <p className="text-xs text-white/70">100 pts</p>
                </div>
                <div>
                  <Award className="h-6 w-6 mx-auto mb-1 text-yellow-300" />
                  <p className="text-2xl font-bold">Gold</p>
                  <p className="text-xs text-white/70">500 pts</p>
                </div>
                <div>
                  <Award className="h-6 w-6 mx-auto mb-1 text-platinum" />
                  <p className="text-2xl font-bold">Platinum</p>
                  <p className="text-xs text-white/70">1000 pts</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white">
                View Your Progress
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
