 'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Package,
  CreditCard,
  Calendar,
  Heart,
  Bookmark,
  Settings,
  Award,
  User,
} from 'lucide-react';
import { getWishlist } from '@/lib/wishlist';
import { getSubscriptions } from '@/lib/subscriptions';
import { getAllOrders, calculateRewardPoints } from '@/lib/order';
import { getCart } from '@/lib/cart';
import supabase from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const accountLinks = [
  {
    title: 'My Orders',
    description: 'Track and manage your orders',
    href: '/account/orders',
    icon: Package,
    color: 'bg-sage/10 text-sage',
  },
  {
    title: 'Subscriptions',
    description: 'Manage your subscription boxes',
    href: '/account/subscriptions',
    icon: CreditCard,
    color: 'bg-dusty/10 text-dusty',
  },
  {
    title: 'Appointments',
    description: 'View expert consultations',
    href: '/account/appointments',
    icon: Calendar,
    color: 'bg-lavender/10 text-lavender',
  },
  {
    title: 'Wishlist',
    description: 'View saved products',
    href: '/wishlist',
    icon: Heart,
    color: 'bg-sage-light text-sage-dark',
  },
  {
    title: 'Saved Articles',
    description: 'Bookmarked learning content',
    href: '/account/saved',
    icon: Bookmark,
    color: 'bg-dusty-light text-dusty-dark',
  },
  {
    title: 'Account Settings',
    description: 'Update profile and preferences',
    href: '/account/settings',
    icon: Settings,
    color: 'bg-beige text-sage-dark',
  },
];

export default function AccountPage() {
  const router = useRouter();
  const [activeOrdersCount, setActiveOrdersCount] = useState<number>(0);
  const [subscriptionsCount, setSubscriptionsCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [rewardPoints, setRewardPoints] = useState<number>(0);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (user) {
        const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(p ?? null);
      } else {
        // Do not force-redirect guests to home — allow the account route
        // to render a guest view so navigation doesn't always bounce back.
        setProfile(null);
      }
    };
    loadProfile();
  }, [router]);

  useEffect(() => {
    const refresh = () => {
      try { setActiveOrdersCount(getAllOrders().filter(o => (o.status === 'Processing' || o.status === 'Paid')).length); } catch(e) { setActiveOrdersCount(0); }
      try { setSubscriptionsCount(getSubscriptions().filter(s => s.status === 'active').length); } catch(e) { setSubscriptionsCount(0); }
      try { setWishlistCount(getWishlist().length); } catch(e) { setWishlistCount(0); }
      try { setRewardPoints(calculateRewardPoints()); } catch(e) { setRewardPoints(0); }
    };
    refresh();
    window.addEventListener('moms_orders_updated', refresh);
    window.addEventListener('moms_wishlist_updated', refresh);
    window.addEventListener('moms_cart_updated', refresh);
    return () => {
      window.removeEventListener('moms_orders_updated', refresh);
      window.removeEventListener('moms_wishlist_updated', refresh);
      window.removeEventListener('moms_cart_updated', refresh);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile Header */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-8">
            {profile ? (
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sage to-dusty flex items-center justify-center text-white font-semibold text-xl">
                  {profile.full_name ? profile.full_name.split(' ').map((n:string)=>n[0]).slice(0,2).join('').toUpperCase() : 'U'}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-foreground mb-1">
                    {profile.full_name}
                  </h1>
                  <p className="text-muted-foreground mb-2">{profile.email}</p>
                  {profile.phone && <p className="text-muted-foreground mb-1">{profile.phone}</p>}
                  {profile.address && <p className="text-muted-foreground">{profile.address}</p>}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sage/10">
                      <Award className="h-4 w-4 text-sage" />
                      <span className="text-sm font-medium text-sage">Member</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{rewardPoints} points</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => router.push('/account/settings')}>Edit Profile</Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold mb-2">You're not signed in</h2>
                <p className="text-sm text-muted-foreground mb-4">To access account features, sign in or create an account from the homepage.</p>
                <Button onClick={() => router.push('/')}>Go to Home</Button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{activeOrdersCount}</p>
                <p className="text-sm text-muted-foreground">Active Orders</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{subscriptionsCount}</p>
                <p className="text-sm text-muted-foreground">Subscriptions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{wishlistCount}</p>
                <p className="text-sm text-muted-foreground">Wishlist Items</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{rewardPoints}</p>
                <p className="text-sm text-muted-foreground">Reward Points</p>
              </CardContent>
            </Card>
          </div>

          {/* Account Links */}
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Account Overview
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accountLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Card className="hover:shadow-soft transition-all cursor-pointer">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Sign Out */}
          <div className="mt-8 text-center">
            <Button variant="ghost" className="text-muted-foreground" onClick={async ()=>{
              await supabase.auth.signOut();
              document.cookie = 'moms_sb_token=; path=/; max-age=0';
              router.push('/');
            }}>
              Sign Out
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
