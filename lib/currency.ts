export function formatINR(amount: number) {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  } catch (e) {
    return `₹${Math.round(amount)}`;
  }
}

export function toINRApproxFromUSD(usd: number) {
  // rough conversion and rounding to realistic pricing
  const rate = 82; // approximate
  return Math.round(usd * rate);
}
