'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Send,
  Minimize2,
  Bot,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { label: 'Find products for my stage', prompt: 'Help me find products for my current stage' },
  { label: 'Track my pregnancy', prompt: 'How can I track my pregnancy progress?' },
  { label: 'Book a consultation', prompt: 'I want to book an expert consultation' },
  { label: 'Get parenting tips', prompt: 'Give me some parenting tips for my stage' },
];

const initialMessages: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: "Hi there! I'm Mama AI, your personal assistant for your motherhood journey. How can I help you today?",
    timestamp: new Date(),
  },
];

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const getResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('product') || lowerMessage.includes('buy') || lowerMessage.includes('shop')) {
      return "I'd be happy to help you find the right products! Based on your stage, I'd recommend checking out our curated collection. Would you like me to show you products for pregnancy, postpartum, newborn care, or toddler development?";
    }
    if (lowerMessage.includes('track') || lowerMessage.includes('pregnancy') || lowerMessage.includes('week')) {
      return "I can help you track your pregnancy! Our growth tracker shows week-by-week progress with baby size visualization, upcoming milestones, and personalized tips. What week are you currently at?";
    }
    if (lowerMessage.includes('consult') || lowerMessage.includes('expert') || lowerMessage.includes('doctor')) {
      return "I can help you book a consultation with one of our certified experts. Would you like to speak with an obstetrician, pediatrician, or lactation consultant?";
    }
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('help')) {
      return "Here's a helpful tip: Staying hydrated is crucial during pregnancy - aim for 8-10 glasses of water daily! Would you like more specific advice for your stage?";
    }
    if (lowerMessage.includes('subscription') || lowerMessage.includes('box')) {
      return "Our subscription boxes are perfect for you! We offer curated boxes for each trimester, newborn care, and toddler development. Each box contains premium products selected by experts. Which stage interests you?";
    }

    return "That's a great question! I'm here to support you through your motherhood journey. Let me help you find the information you need.";
  }, []);

  const handleSendMessage = useCallback(() => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(trimmedInput);
      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  }, [inputValue, isTyping, getResponse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Button - Only visible when chat is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleOpen}
              className="w-14 h-14 rounded-full shadow-glow bg-sage hover:bg-sage-dark transition-all"
              size="icon"
              aria-label="Open AI Assistant"
            >
              <Sparkles className="h-6 w-6 text-white" />
            </Button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-dusty rounded-full animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '500px',
              maxHeight: isMinimized ? '56px' : 'calc(100vh - 120px)',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card rounded-3xl shadow-soft-lg border border-border overflow-hidden flex flex-col"
          >
            {/* Header - Always visible */}
            <div className="bg-gradient-to-r from-sage to-sage-dark p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Mama AI</h3>
                  <p className="text-xs text-white/80">Your personal assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMinimize}
                  className="h-8 w-8 text-white hover:bg-white/20"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-8 w-8 text-white hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages - Hidden when minimized */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'assistant' ? 'bg-sage/10' : 'bg-muted'
                        }`}
                      >
                        {message.role === 'assistant' ? (
                          <Bot className="h-4 w-4 text-sage" />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div
                        className={`max-w-[240px] rounded-2xl px-4 py-2 text-sm ${
                          message.role === 'assistant'
                            ? 'bg-muted text-foreground'
                            : 'bg-sage text-white'
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-sage" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions - Only show when no messages yet */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2 flex-shrink-0">
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <Button
                          key={action.label}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action.prompt)}
                          className="text-xs rounded-full"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border flex-shrink-0">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      disabled={isTyping}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-sage hover:bg-sage-dark shrink-0"
                      size="icon"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
