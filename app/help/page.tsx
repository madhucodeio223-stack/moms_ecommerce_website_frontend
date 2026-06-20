import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata = {
  title: 'Help Center | MamaNest',
  description: 'Find answers to common questions and get support.',
};

const faqs = [
  {
    question: 'How do subscription boxes work?',
    answer: 'Our subscription boxes are delivered monthly and curated based on your stage of motherhood. You can pause, skip, or cancel anytime. Each box contains premium products selected by experts.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day hassle-free return policy on all products. Items must be unused and in original packaging. Contact our support team to initiate a return.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive an email with tracking information. You can also track your order in your account dashboard.',
  },
  {
    question: 'Are your products safe?',
    answer: 'Yes! All our products are vetted by pediatricians and child development experts. We prioritize organic, BPA-free, and non-toxic materials.',
  },
  {
    question: 'How do I book an expert consultation?',
    answer: 'Visit our Expert Consultations page, choose an expert, select an available time slot, and complete your booking. You\'ll receive a confirmation email with video call details.',
  },
];

export default function HelpPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-sage-light/10 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              How Can We Help?
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions or reach out to our support team.
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for?
              </p>
              <Button className="bg-sage hover:bg-sage-dark text-white">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
