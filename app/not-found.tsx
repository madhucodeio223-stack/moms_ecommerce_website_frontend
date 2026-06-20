import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-card p-8 rounded-2xl shadow text-center">
          <h1 className="text-3xl font-bold mb-2">Page not found</h1>
          <p className="text-sm text-muted-foreground mb-6">We couldn't find the page you're looking for.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/" className="px-4 py-2 rounded-md bg-sage text-white font-semibold">Go home</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
