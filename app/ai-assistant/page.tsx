'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, Sparkles, Gift, Package, Calendar, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestions = [
  { icon: Package, text: 'Find products for my pregnancy stage' },
  { icon: Calendar, text: 'Track my pregnancy progress' },
  { icon: Gift, text: 'Recommend a subscription box' },
  { icon: HelpCircle, text: 'Get parenting tips' },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Mama AI, your personal assistant for your motherhood journey. I can help you find products, track your pregnancy, book consultations with experts, and provide personalized recommendations. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        products: "I'd be happy to help you find the right products! Based on your stage, I'd recommend checking out our curated collection. Would you like me to show you products for pregnancy, postpartum, newborn care, or toddler development?",
        track: "I can help you track your pregnancy! Our growth tracker shows week-by-week progress with baby size visualization, upcoming milestones, and personalized tips. What week are you currently at?",
        subscription: "Our subscription boxes are a great choice! We have boxes for each trimester, newborn care, and toddler development. Each box is curated by experts and delivered monthly. Which stage would you like a box for?",
        tips: "Here are some helpful tips: Stay hydrated with 8-10 glasses of water daily, take your prenatal vitamins consistently, get plenty of rest, and don't hesitate to ask for help. Would you like more specific advice?",
        default: "That's a great question! I'm here to support you through your motherhood journey. Let me help you find the information you need.",
      };

      const lowerInput = input.toLowerCase();
      let category = 'default';

      if (lowerInput.includes('product') || lowerInput.includes('buy') || lowerInput.includes('shop')) {
        category = 'products';
      } else if (lowerInput.includes('track') || lowerInput.includes('pregnancy') || lowerInput.includes('week')) {
        category = 'track';
      } else if (lowerInput.includes('subscription') || lowerInput.includes('box') || lowerInput.includes('monthly')) {
        category = 'subscription';
      } else if (lowerInput.includes('tip') || lowerInput.includes('advice') || lowerInput.includes('help')) {
        category = 'tips';
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[category],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-br from-sage-light/20 via-background to-dusty-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-sage to-sage-dark flex items-center justify-center mb-4">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mama AI</h1>
            <p className="text-muted-foreground">
              Your personal assistant for every step of motherhood
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-card rounded-3xl border border-border shadow-soft-lg overflow-hidden">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-4 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        message.role === 'assistant'
                          ? 'bg-sage/10'
                          : 'bg-muted'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="h-5 w-5 text-sage" />
                      ) : (
                        <User className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div
                      className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                        message.role === 'assistant'
                          ? 'bg-muted text-foreground'
                          : 'bg-sage text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-sage" />
                    </div>
                    <div className="bg-muted rounded-2xl px-5 py-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => {
                    const Icon = suggestion.icon;
                    return (
                      <Button
                        key={suggestion.text}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestion(suggestion.text)}
                        className="rounded-full"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {suggestion.text}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-background"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-sage hover:bg-sage-dark px-6"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Mama AI provides general guidance and product recommendations. For medical advice, please consult with a healthcare professional.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
