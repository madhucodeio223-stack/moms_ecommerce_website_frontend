export type Subscription = {
  id: string;
  planId: string;
  name: string;
  status: 'active' | 'paused' | 'cancelled' | string;
  nextRenewal?: string;
};

const KEY = 'moms_subscriptions_v1';

export function getSubscriptions(): Subscription[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('getSubscriptions error', e);
    return [];
  }
}

export function saveSubscriptions(list: Subscription[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    console.error('saveSubscriptions error', e);
  }
}
