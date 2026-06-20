'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { formatINR, toINRApproxFromUSD } from '@/lib/currency';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Package } from 'lucide-react';

const allProducts = [
  { id: 1, name: 'Premium Prenatal Vitamins', price: 34.99, category: 'Pregnancy Supplements', image: 'https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=200', tags: ['pregnancy', 'vitamins', 'health'] },
  { id: 2, name: 'Organic Cotton Maternity Dress', price: 79.99, category: 'Maternity Wear', image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=200', tags: ['clothing', 'pregnancy', 'organic'] },
  { id: 3, name: 'Hospital Bag Essentials Kit', price: 149.99, category: 'Hospital Bags', image: 'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=200', tags: ['hospital', 'delivery', 'essentials'] },
  { id: 4, name: 'Electric Breast Pump Pro', price: 199.99, category: 'Nursing Essentials', image: 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=200', tags: ['nursing', 'breastfeeding', 'baby'] },
  { id: 5, name: 'Premium Organic Diapers', price: 34.99, category: 'Diapers & Care', image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=200', tags: ['diapers', 'baby', 'organic'] },
  { id: 6, name: 'Premium Travel Stroller', price: 349.99, category: 'Strollers', image: 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=200', tags: ['stroller', 'travel', 'baby'] },
  { id: 7, name: 'Baby Food Maker Bundle', price: 129.99, category: 'Baby Feeding', image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=200', tags: ['feeding', 'baby', 'food'] },
  { id: 8, name: 'Swaddle Blanket Set', price: 49.99, category: 'Newborn', image: 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=200', tags: ['swaddle', 'newborn', 'blanket'] },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(allProducts);

  useEffect(() => {
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
      setResults(filtered);
    } else {
      setResults(allProducts);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the effect
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Search Products
            </h1>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, categories..."
                  className="pl-12 h-14 text-lg bg-card border-border rounded-2xl"
                  autoFocus
                />
              </div>
            </form>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {query ? (
                <>
                  Found <span className="font-medium text-foreground">{results.length}</span> results for &quot;<span className="text-foreground">{query}</span>&quot;
                </>
              ) : (
                <>
                  Showing <span className="font-medium text-foreground">{results.length}</span> products
                </>
              )}
            </p>
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try searching for something else
              </p>
              <Button onClick={() => setQuery('')} variant="outline">
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((product) => (
                <Link key={product.id} href={`/shop/${product.id}`}>
                  <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-soft-lg transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {product.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-sage transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-sage">
                        {formatINR(toINRApproxFromUSD(product.price))}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-foreground mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {['Prenatal vitamins', 'Breast pump', 'Stroller', 'Diapers', 'Maternity dress', 'Hospital bag'].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(term)}
                  className="rounded-full"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
