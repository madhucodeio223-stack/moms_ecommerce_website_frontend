import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CategoriesSection } from '@/components/sections/categories-section';
import { AIChatWidget } from '@/components/ai-chat-widget';

export const metadata = {
  title: 'Shop | MamaNest',
  description: 'Browse our curated collection of maternity, baby, and toddler products.',
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-cream to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Shop Our Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium products carefully curated for every stage of your motherhood journey.
            </p>
          </div>
        </section>
        <CategoriesSection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
