import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LearningSection } from '@/components/sections/learning-section';
import { AIChatWidget } from '@/components/ai-chat-widget';

export const metadata = {
  title: 'Learning Hub | MamaNest',
  description: 'Expert-verified guides, video tutorials, podcasts, and downloadable resources for parents.',
};

export default function LearnPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-dusty-light/10 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Learning Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert-verified guides, video tutorials, podcasts, and downloadable resources.
            </p>
          </div>
        </section>
        <LearningSection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
