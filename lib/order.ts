export type Order = {
  id: string;
  planId: string;
  planName: string;
  products?: Array<{
    id?: string;
    title: string;
    price: number; // INR
    qty: number;
  }>;
  amount: number;
  tax: number;
  total: number;
  paymentMethod?: string;
  paymentStatus?: 'Pending' | 'Paid' | 'Failed' | string;
  status?: 'Paid' | 'Processing' | 'Shipped' | 'Completed' | 'Cancelled' | string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  gift?: {
    recipientName?: string;
    recipientEmail?: string;
    message?: string;
  };
  createdAt: string;
};

const STORAGE_KEY = 'moms_orders_v1';

export function saveOrder(order: Order) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: Order[] = raw ? JSON.parse(raw) : [];
    arr.push(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    // notify listeners
    window.dispatchEvent(new CustomEvent('moms_orders_updated'));
  } catch (e) {
    console.error('saveOrder error', e);
  }
}

export function getOrder(id: string): Order | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: Order[] = raw ? JSON.parse(raw) : [];
    return arr.find((o) => o.id === id) || null;
  } catch (e) {
    console.error('getOrder error', e);
    return null;
  }
}

export function getAllOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: Order[] = raw ? JSON.parse(raw) : [];
    return arr;
  } catch (e) {
    console.error('getAllOrders error', e);
    return [];
  }
}

export function calculateRewardPoints(): number {
  const orders = getAllOrders();
  // 10 points per ₹100 spent for completed orders
  const completed = orders.filter((o) => (o.status || 'Completed') === 'Completed' || o.status === 'Paid');
  const total = completed.reduce((s, o) => s + (o.total || 0), 0);
  return Math.floor(total / 100) * 10;
}

export function generateOrderId() {
  return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
}
