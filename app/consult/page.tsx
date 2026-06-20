import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ExpertsSection } from '@/components/sections/experts-section';
import { AIChatWidget } from '@/components/ai-chat-widget';

export const metadata = {
  title: 'Expert Consultations | MamaNest',
  description: 'Book video consultations with obstetricians, pediatricians, and child development experts.',
};

export default function ConsultPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-lavender/10 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Expert Consultations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with certified experts for personalized guidance throughout your journey.
            </p>
          </div>
        </section>
        <ExpertsSection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}