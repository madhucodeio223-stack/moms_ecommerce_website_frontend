'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import useWishlistStore from '@/stores/wishlist-store';
import useCartStore from '@/stores/cart-store';
// import supabase lazily inside useEffect to avoid bundler issues

const navigation = [
  {
    title: 'Shop',
    href: '/shop',
    children: [
      { title: 'Maternity Wear', href: '/shop/maternity-wear' },
      { title: 'Pregnancy Supplements', href: '/shop/pregnancy-supplements' },
      { title: 'Nursing Essentials', href: '/shop/nursing-essentials' },
      { title: 'Hospital Bags', href: '/shop/hospital-bags' },
      { title: 'Baby Feeding', href: '/shop/baby-feeding' },
      { title: 'Diapers & Care', href: '/shop/diapers-care' },
    ],
  },
  {
    title: 'Subscriptions',
    href: '/subscriptions',
    children: [
      { title: 'First Trimester Box', href: '/subscriptions/first-trimester' },
      { title: 'Second Trimester Box', href: '/subscriptions/second-trimester' },
      { title: 'Third Trimester Box', href: '/subscriptions/third-trimester' },
      { title: 'Newborn Box', href: '/subscriptions/newborn' },
      { title: 'Toddler Growth Box', href: '/subscriptions/toddler' },
    ],
  },
  { title: 'Growth Tracker', href: '/tracker' },
  { title: 'Consult Experts', href: '/consult' },
  { title: 'Learning Hub', href: '/learn' },
  { title: 'Community', href: '/community' },
];

export function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + (i.qty || 0), 0));
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    let listenerUnsubscribe: (() => void) | null = null;

    const init = async () => {
      try {
        const mod = await import('@/lib/supabaseClient');
        const supabase = mod.default ?? mod;
        const { data } = await supabase.auth.getSession();
        const sessionUser = data?.session?.user ?? null;
        if (!mounted) return;
        setUser(sessionUser);
        if (sessionUser) {
          const { data: p } = await supabase.from('profiles').select('*').eq('id', sessionUser.id).single();
          if (!mounted) return;
          setProfile(p ?? null);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
          const u = session?.user ?? null;
          if (!mounted) return;
          setUser(u);
          if (!u) setProfile(null);
          if (u) {
            supabase.from('profiles').select('*').eq('id', u.id).single().then(({ data: p }) => { if (mounted) setProfile(p ?? null); });
          }
        });
        listenerUnsubscribe = () => authListener.subscription.unsubscribe();
      } catch (e) {
        // supabase may not be available during static analysis; ignore runtime import errors here
        console.error('Supabase init error', e);
      }
    };

    init();

    return () => {
      mounted = false;
      try { if (listenerUnsubscribe) listenerUnsubscribe(); } catch (e) {}
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // counts are derived from Zustand stores; no manual init needed

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  }, [router, searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      // Focus the input when expanding
      setTimeout(() => {
        const input = document.querySelector('input[name="search"]') as HTMLInputElement;
        if (input) input.focus();
      }, 100);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-soft'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sage to-sage-dark flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-dusty rounded-full animate-pulse-soft" />
              </motion.div>
              <span className="text-xl font-bold text-foreground hidden sm:block">
                Mama<span className="text-sage">Nest</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-muted data-[active]:bg-muted">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 w-[280px]">
                            {item.children.map((child) => (
                              <li key={child.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {child.title}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex items-center">
                <AnimatePresence>
                  {isSearchExpanded && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="hidden md:block overflow-hidden mr-2"
                    >
                      <Input
                        type="search"
                        name="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search products..."
                        className="w-64 bg-muted border-0"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {isSearchExpanded ? (
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSearch}
                    className="hover:bg-muted"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </form>

              {/* AI Assistant */}
              <Link href="/ai-assistant" className="hidden lg:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-sage/10 relative"
                >
                  <Sparkles className="h-5 w-5 text-sage" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-sage rounded-full animate-pulse" />
                </Button>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="hidden lg:block">
                <Button variant="ghost" size="icon" className="hover:bg-muted relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-sage text-white text-xs rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="hover:bg-muted relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sage text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                </Button>
              </Link>

              {/* Account */}
              {user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/account" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-sage font-semibold">{profile?.full_name ? profile.full_name.split(' ').map((n:string)=>n[0]).slice(0,2).join('').toUpperCase() : 'U'}</div>
                    <span className="hidden sm:block">{profile?.full_name ?? user.email}</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={async ()=>{
                    try {
                      const mod = await import('@/lib/supabaseClient');
                      const supabase = mod.default ?? mod;
                      await supabase.auth.signOut();
                    } catch (e) {
                      console.error('Logout supabase error', e);
                    }
                    // clear auth cookie
                    document.cookie = 'moms_sb_token=; path=/; max-age=0';
                    router.push('/');
                  }}>Log out</Button>
                </div>
              ) : (
                <div className="hidden lg:flex gap-2">
                  <Link href="/account"><Button variant="ghost">Account</Button></Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden pt-16"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-lg">
              <div className="p-4 space-y-4 mt-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10"
                  />
                </form>

                {navigation.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block text-lg font-medium text-foreground hover:text-sage transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border flex items-center space-x-2">
                  <Link href="/wishlist" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                  </Link>
                  <Link href="/cart" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Cart
                    </Button>
                  </Link>
                </div>
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-sage hover:bg-sage-dark">
                    My Account
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
