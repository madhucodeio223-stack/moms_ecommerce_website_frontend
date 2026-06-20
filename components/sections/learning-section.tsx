'use client';

import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Headphones, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const contentCategories = [
  {
    icon: FileText,
    title: 'Guides & Articles',
    count: 156,
    color: 'bg-sage/10 text-sage',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    count: 89,
    color: 'bg-dusty/10 text-dusty',
  },
  {
    icon: Headphones,
    title: 'Podcasts',
    count: 42,
    color: 'bg-lavender/10 text-lavender',
  },
];

const articles = [
  {
    id: 1,
    title: 'Complete Guide to First Trimester: What to Expect',
    category: 'Pregnancy Guide',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'article',
    featured: true,
  },
  {
    id: 2,
    title: 'Breastfeeding Basics: A Comprehensive Start',
    category: 'Nursing',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'video',
    featured: false,
  },
  {
    id: 3,
    title: 'Sleep Training Methods Compared',
    category: 'Baby Care',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'article',
    featured: false,
  },
  {
    id: 4,
    title: 'Nutrition Through Pregnancy: Month by Month',
    category: 'Nutrition',
    readTime: '15 min read',
    image: 'https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'guide',
    featured: true,
  },
  {
    id: 5,
    title: 'Understanding Your Baby\'s Development Milestones',
    category: 'Development',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'article',
    featured: false,
  },
];

export function LearningSection() {
  const featuredArticles = articles.filter(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              Learning Hub
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Knowledge for Every Stage
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expert-verified guides, video tutorials, podcasts, and downloadable resources.
            </p>
          </div>

          {/* Content Stats */}
          <div className="flex flex-wrap gap-4 mt-6 lg:mt-0">
            {contentCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted"
                >
                  <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{cat.count}</p>
                    <p className="text-xs text-muted-foreground">{cat.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured Article - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden group cursor-pointer">
              <img
                src={featuredArticles[0].image}
                alt={featuredArticles[0].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-sage text-white">
                    {featuredArticles[0].category}
                  </Badge>
                  {featuredArticles[0].type === 'video' && (
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="h-5 w-5 text-white fill-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {featuredArticles[0].title}
                </h3>
                <p className="text-sm text-white/80">
                  {featuredArticles[0].readTime}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Smaller Articles */}
          <div className="space-y-6">
            {regularArticles.slice(0, 3).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {article.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit text-xs mb-2">
                      {article.category}
                    </Badge>
                    <h4 className="font-semibold text-foreground line-clamp-2 group-hover:text-sage transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {article.readTime}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {articles.slice(2).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {article.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="h-5 w-5 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>
              <Badge variant="secondary" className="text-xs mb-2">
                {article.category}
              </Badge>
              <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-sage transition-colors text-sm">
                {article.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {article.readTime}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button className="bg-sage hover:bg-sage-dark text-white group">
            Explore Learning Hub
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline">
            Downloadable PDFs
          </Button>
        </motion.div>
      </div>
    </section>
  );
}





















