import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatINR, toINRApproxFromUSD } from '@/lib/currency';

export const metadata = {
  title: 'My Subscriptions | MamaNest',
  description: 'Manage your subscription boxes.',
};

export default function AccountSubscriptionsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Subscriptions</h1>

          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge className="bg-sage text-white mb-2">Active</Badge>
                <h3 className="text-xl font-semibold text-foreground">Second Trimester Box</h3>
                <p className="text-sm text-muted-foreground">Next delivery: July 15, 2024</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatINR(toINRApproxFromUSD(99))}/mo</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">Skip Next Delivery</Button>
              <Button variant="outline" size="sm">Pause Subscription</Button>
              <Button variant="outline" size="sm" className="text-destructive">Cancel</Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No other active subscriptions</p>
              <Button className="bg-sage hover:bg-sage-dark text-white">
                Browse Subscription Boxes
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}

