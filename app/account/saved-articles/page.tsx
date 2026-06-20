'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getSavedArticles, removeSavedArticle } from '@/lib/savedArticles';
import { Button } from '@/components/ui/button';

export default function SavedArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    setArticles(getSavedArticles());
  }, []);

  function handleRemove(id: string) {
    removeSavedArticle(id);
    setArticles(getSavedArticles());
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-semibold mb-6">Saved Articles</h1>

          {articles.length === 0 ? (
            <div className="bg-card p-4 rounded-md">You have no saved articles</div>
          ) : (
            articles.map(a => (
              <div key={a.id} className="bg-card p-4 rounded-md mb-2 flex justify-between items-center">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.excerpt}</div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm">Read</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleRemove(a.id)}>Remove</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
