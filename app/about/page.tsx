import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Heart, Users, Award, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Us | MamaNest',
  description: 'Learn about MamaNest and our mission to support mothers.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24 bg-gradient-to-br from-cream to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Supporting every mother through her journey, from pregnancy to toddlerhood, with premium products, expert guidance, and a caring community.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-sage/10 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-sage" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">100K+ Mothers</h3>
                <p className="text-sm text-muted-foreground">Trusted by families worldwide</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-dusty/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-dusty" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">50+ Experts</h3>
                <p className="text-sm text-muted-foreground">Certified specialists</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-lavender/10 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-lavender" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">500+ Products</h3>
                <p className="text-sm text-muted-foreground">Carefully curated</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-sage-light flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-sage-dark" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">4.9 Rating</h3>
                <p className="text-sm text-muted-foreground">Customer satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-4">
                MamaNest was founded by a team of mothers who understood the challenges of navigating pregnancy, newborn care, and early childhood. We experienced firsthand the overwhelming amount of information and products available, often with no clear guidance on what was truly best.
              </p>
              <p className="mb-4">
                We set out to create a platform that combines premium products with expert guidance and community support. Every product in our store is carefully vetted by pediatricians and child development experts. Our subscription boxes are designed to provide exactly what you need at each stage of your journey.
              </p>
              <p>
                Today, MamaNest supports over 100,000 mothers through their journey, and we're just getting started. Our mission is to be the trusted companion for every mother, every step of the way.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
