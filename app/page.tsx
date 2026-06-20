import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { JourneySection } from '@/components/sections/journey-section';
import { CategoriesSection } from '@/components/sections/categories-section';
import { SubscriptionSection } from '@/components/sections/subscription-section';
import { ExpertsSection } from '@/components/sections/experts-section';
import { LearningSection } from '@/components/sections/learning-section';
import { CommunitySection } from '@/components/sections/community-section';
import { TrustSection } from '@/components/sections/trust-section';
import { AIChatWidget } from '@/components/ai-chat-widget';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <JourneySection />
        <CategoriesSection />
        <SubscriptionSection />
        <ExpertsSection />
        <LearningSection />
        <CommunitySection />
        <TrustSection />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
