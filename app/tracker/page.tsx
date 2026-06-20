import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GrowthTrackerSection } from '@/components/sections/growth-tracker-section';
import { AIChatWidget } from '@/components/ai-chat-widget';
import Link from 'next/link';

export const metadata = {
  title: 'Growth Tracker | MamaNest',
  description: 'Track your pregnancy week-by-week and monitor your baby\'s growth and milestones.',
};

export default function TrackerPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-sage/10 to-mint/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Growth Tracker
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Week-by-week pregnancy tracking with personalized insights, interactive charts and helpful tools to support your journey.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="#tracker" className="inline-flex items-center px-6 py-3 rounded-md bg-sage text-white font-semibold shadow-md hover:shadow-lg">
                Start Tracking
              </Link>
              <Link href="/account" className="inline-flex items-center px-6 py-3 rounded-md border border-muted hover:bg-muted/5">
                View Your Profile
              </Link>
            </div>
          </div>
        </section>

        <section id="tracker" className="-mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 lg:p-10">
                <GrowthTrackerSection />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
