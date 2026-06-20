import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CommunitySection } from '@/components/sections/community-section';
import { AIChatWidget } from '@/components/ai-chat-widget';

export const metadata = {
  title: 'Community | MamaNest',
  description: 'Join 200,000+ mothers in our supportive community forums, due-date groups, and discussions.',
};

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-sage-light/20 to-dusty-light/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              MamaNest Community
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ask questions, share experiences, and connect with mothers on the same journey as you.
            </p>
          </div>
        </section>
        <CommunitySection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
