const productImages: Record<string, string> = {
  'Prenatal Vitamin': '/images/products/prenatal-vitamin.jpg',
  'Pregnancy Tea': '/images/products/pregnancy-tea.jpg',
  'Baby Essentials Box': '/images/products/baby-essentials.jpg',
  'Trimester Wellness Box': '/images/products/trimester-wellness.jpg',
  'Yoga Kit': '/images/products/yoga-kit.jpg',
  'Skin Care Kit': '/images/products/skincare-kit.jpg',
  'Meditation Bundle': '/images/products/meditation-bundle.jpg',
  'Gift Box': '/images/products/gift-box.jpg',
};

const categoryImages: Record<string, string> = {
  'vitamins': '/images/products/category-vitamins.jpg',
  'tea': '/images/products/category-tea.jpg',
  'boxes': '/images/products/category-box.jpg',
  'yoga': '/images/products/category-yoga.jpg',
  'skincare': '/images/products/category-skincare.jpg',
  'meditation': '/images/products/category-meditation.jpg',
};

export function getProductImage(productName: string, category?: string) {
  if (productImages[productName]) return productImages[productName];
  if (category && categoryImages[category]) return categoryImages[category];
  return '/images/products/default-product.jpg';
}

export default productImages;
