"use client";

import { useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to the console for local debugging
    // (in production this could be sent to an error reporting service)
    // eslint-disable-next-line no-console
    console.error('Global error:', error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-card p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-sm text-muted-foreground mb-6">{error?.message ?? 'An unexpected error occurred.'}</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => reset?.()}
              className="px-4 py-2 rounded-md bg-sage text-white font-semibold"
            >
              Try again
            </button>
            <a href="/" className="px-4 py-2 rounded-md border">Go home</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
