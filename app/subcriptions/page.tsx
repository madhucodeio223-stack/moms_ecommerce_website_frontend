import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SubscriptionSection } from '@/components/sections/subscription-section';
import { AIChatWidget } from '@/components/ai-chat-widget';

export const metadata = {
  title: 'Subscription Boxes | MamaNest',
  description: 'Monthly subscription boxes curated for every stage of your motherhood journey.',
};

export default function SubscriptionsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-sage-light/20 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Subscription Boxes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated monthly boxes tailored to your journey, filled with premium products and delightful surprises.
            </p>
          </div>
        </section>
        <SubscriptionSection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
