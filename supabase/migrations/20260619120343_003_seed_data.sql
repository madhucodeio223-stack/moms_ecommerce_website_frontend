-- Insert default categories
INSERT INTO public.categories (name, slug, description, image_url, display_order) VALUES
('Maternity Wear', 'maternity-wear', 'Comfortable and stylish clothing for expectant mothers', 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('Pregnancy Supplements', 'pregnancy-supplements', 'Essential vitamins and nutrients for pregnancy', 'https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
('Nursing Essentials', 'nursing-essentials', 'Breast pumps, nursing bras, and accessories', 'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
('Hospital Bags', 'hospital-bags', 'Pre-packed essentials for delivery day', 'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
('Baby Feeding', 'baby-feeding', 'Bottles, formula, and feeding accessories', 'https://images.pexels.com/photos/5836642/pexels-photo-5836642.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
('Diapers & Care', 'diapers-care', 'Gentle diapers and baby skincare', 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
('Strollers', 'strollers', 'Premium travel systems and strollers', 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
('Nursery', 'nursery', 'Create the perfect nursery space', 'https://images.pexels.com/photos/3913269/pexels-photo-3913269.jpeg?auto=compress&cs=tinysrgb&w=400', 8);

-- Insert subscription plans
INSERT INTO public.subscription_plans (name, slug, stage, description, price, compare_at_price, billing_interval, image_url, features, is_popular, status) VALUES
('First Trimester Box', 'first-trimester', 'pregnancy', 'Essential vitamins, wellness products, and educational guides for early pregnancy.', 89, 120, 'monthly', 'https://images.pexels.com/photos/5945798/pexels-photo-5945798.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Prenatal Vitamins', 'Morning Sickness Relief', 'Pregnancy Journal', 'Nutrition Guide'], false, 'active'),
('Second Trimester Box', 'second-trimester', 'pregnancy', 'Comfort products and nutrition kits for your growing bump.', 99, 135, 'monthly', 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Stretch Mark Cream', 'Maternity Pillow', 'Comfortable Loungewear', 'Nutrition Kit'], true, 'active'),
('Third Trimester Box', 'third-trimester', 'pregnancy', 'Complete hospital preparation kit for your delivery day.', 129, 175, 'monthly', 'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Hospital Bag Set', 'Nursing Bras', 'Postpartum Essentials', 'Birth Plan Guide'], false, 'active'),
('Newborn Box', 'newborn', 'newborn', 'Everything your newborn needs in their first weeks.', 109, 150, 'monthly', 'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Organic Diapers (Month Supply)', 'Swaddle Blankets', 'Baby Skincare Set', 'First Aid Kit'], false, 'active'),
('Toddler Growth Box', 'toddler', 'toddler', 'Educational toys and development activities for curious minds.', 79, 110, 'monthly', 'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Educational Toys', 'Activity Cards', 'Story Books', 'Development Guide'], false, 'active');

-- Insert sample experts
INSERT INTO public.experts (name, title, specialization, bio, image_url, rating, review_count, experience_years, is_available, consultation_price) VALUES
('Dr. Sarah Mitchell', 'Obstetrician & Gynecologist', ARRAY['High-Risk Pregnancy', 'Prenatal Care'], 'Board-certified OB/GYN with over 15 years of experience specializing in high-risk pregnancies and comprehensive prenatal care.', 'https://images.pexels.com/photos/4067229/pexels-photo-4067229.jpeg?auto=compress&cs=tinysrgb&w=200', 4.9, 324, 15, true, 75),
('Dr. Emily Chen', 'Pediatrician', ARRAY['Newborn Care', 'Development'], 'Dedicated pediatrician focused on newborn care and early childhood development with a gentle, family-centered approach.', 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200', 4.8, 256, 12, true, 70),
('Jessica Williams', 'Lactation Consultant', ARRAY['Breastfeeding', 'Nutrition'], 'Certified lactation consultant helping mothers navigate breastfeeding challenges with compassion and expertise.', 'https://images.pexels.com/photos/4170762/pexels-photo-4170762.jpeg?auto=compress&cs=tinysrgb&w=200', 5.0, 189, 10, false, 60),
('Dr. Michael Brown', 'Child Development Expert', ARRAY['Cognitive Development', 'Early Learning'], 'Child development specialist with expertise in cognitive milestones and early learning strategies.', 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200', 4.9, 142, 18, true, 80);

-- Insert sample products
INSERT INTO public.products (name, description, short_description, price, compare_at_price, sku, quantity, category_id, stage, featured_image, featured, bestseller, pediatrician_approved, organic, rating, review_count, status)
SELECT 
  'Premium Prenatal Vitamins',
  'Complete daily prenatal vitamins formulated by obstetricians. Contains folic acid, iron, DHA, and essential nutrients for a healthy pregnancy.',
  'Doctor-formulated prenatal vitamins',
  34.99,
  44.99,
  'VIT-PRE-001',
  500,
  c.id,
  'pregnancy',
  'https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  true,
  true,
  true,
  4.8,
  342,
  'active'
FROM public.categories c WHERE c.slug = 'pregnancy-supplements'
LIMIT 1;

INSERT INTO public.products (name, description, short_description, price, compare_at_price, sku, quantity, category_id, stage, featured_image, featured, bestseller, pediatrician_approved, rating, review_count, status)
SELECT 
  'Organic Cotton Maternity Dress',
  'Soft, breathable organic cotton maternity dress perfect for all stages of pregnancy. Designed to grow with your bump while keeping you comfortable and stylish.',
  'Luxuriously soft organic cotton dress',
  79.99,
  99.99,
  'DRE-MAT-002',
  150,
  c.id,
  'pregnancy',
  'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  true,
  false,
  4.7,
  189,
  'active'
FROM public.categories c WHERE c.slug = 'maternity-wear'
LIMIT 1;

INSERT INTO public.products (name, description, short_description, price, compare_at_price, sku, quantity, category_id, stage, featured_image, featured, bestseller, pediatrician_approved, organic, rating, review_count, status)
SELECT 
  'Hospital Bag Essentials Kit',
  'Everything you need for delivery day. Pre-packed hospital bag with postpartum recovery essentials, nursing supplies, and comfort items.',
  'Complete hospital bag set',
  149.99,
  199.99,
  'BAG-HOS-001',
  200,
  c.id,
  'hospital',
  'https://images.pexels.com/photos/7763942/pexels-photo-7763942.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  true,
  false,
  false,
  4.9,
  278,
  'active'
FROM public.categories c WHERE c.slug = 'hospital-bags'
LIMIT 1;

INSERT INTO public.products (name, description, short_description, price, compare_at_price, sku, quantity, category_id, stage, featured_image, featured, bestseller, pediatrician_approved, organic, rating, review_count, status)
SELECT 
  'Electric Breast Pump Pro',
  'Hospital-grade electric breast pump with quiet motor, multiple suction settings, and closed system for hygienic pumping. Includes carrying case.',
  'Premium electric breast pump',
  199.99,
  279.99,
  'PMP-BRS-001',
  80,
  c.id,
  'postpartum',
  'https://images.pexels.com/photos/3913277/pexels-photo-3913277.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  true,
  false,
  false,
  4.8,
  456,
  'active'
FROM public.categories c WHERE c.slug = 'nursing-essentials'
LIMIT 1;

INSERT INTO public.products (name, description, short_description, price, sku, quantity, category_id, stage, featured_image, featured, bestseller, pediatrician_approved, organic, rating, review_count, status)
SELECT 
  'Premium Organic Diapers Pack',
  'Ultra-soft, hypoallergenic diapers made from sustainable materials. Gentle on baby''s skin with superior absorbency. Pack of 100.',
  'Eco-friendly premium diapers',
  34.99,
  'DIA-ORB-001',
  300,
  c.id,
  'newborn',
  'https://images.pexels.com/photos/2660034/pexels-photo-2660034.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  true,
  true,
  true,
  4.9,
  892,
  'active'
FROM public.categories c WHERE c.slug = 'diapers-care'
LIMIT 1;

INSERT INTO public.products (name, description, short_description, price, compare_at_price, sku, quantity, category_id, stage, featured_image, featured, bestseller, pediatrician_approved, rating, review_count, status)
SELECT 
  'Premium Travel Stroller',
  'Lightweight, compact stroller with one-hand fold, all-terrain wheels, and adjustable seat. Perfect for urban parents on the go.',
  'Ultra-light stroller system',
  349.99,
  449.99,
  'STR-PRE-001',
  40,
  c.id,
  'infant',
  'https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  true,
  false,
  4.7,
  234,
  'active'
FROM public.categories c WHERE c.slug = 'strollers'
LIMIT 1;