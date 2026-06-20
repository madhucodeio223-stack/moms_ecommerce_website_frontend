import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JourneySection } from '@/components/sections/journey-section';
import { AIChatWidget } from '@/components/ai-chat-widget';

export const metadata = {
  title: 'Your Journey | MamaNest',
  description: 'Find personalized products and content based on your stage of motherhood.',
};

export default function JourneyPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-cream to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Where Are You on Your Journey?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your stage to discover personalized products, content, and support.
            </p>
          </div>
        </section>
        <JourneySection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
