-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "select_own_profile" ON public.profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);
CREATE POLICY "update_own_profile" ON public.profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "insert_own_profile" ON public.profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

-- RLS Policies for products (public read)
CREATE POLICY "select_products" ON public.products FOR SELECT
  TO public USING (status = 'active');

-- RLS Policies for categories (public read)
CREATE POLICY "select_categories" ON public.categories FOR SELECT
  TO public USING (true);

-- RLS Policies for subscription_plans (public read)
CREATE POLICY "select_subscription_plans" ON public.subscription_plans FOR SELECT
  TO public USING (status = 'active');

-- RLS Policies for user_subscriptions
CREATE POLICY "select_own_subscriptions" ON public.user_subscriptions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_subscriptions" ON public.user_subscriptions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_subscriptions" ON public.user_subscriptions FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "select_own_orders" ON public.orders FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_orders" ON public.orders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_orders" ON public.orders FOR UPDATE
  TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for order_items
CREATE POLICY "select_own_order_items" ON public.order_items FOR SELECT
  TO authenticated USING (auth.uid() IN (
    SELECT user_id FROM public.orders WHERE id = order_id
  ));

-- RLS Policies for cart_items
CREATE POLICY "select_own_cart" ON public.cart_items FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_cart" ON public.cart_items FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_cart" ON public.cart_items FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_cart" ON public.cart_items FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for registries
CREATE POLICY "select_registries" ON public.registries FOR SELECT
  TO public USING (is_public = true);
CREATE POLICY "select_own_registries" ON public.registries FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_registries" ON public.registries FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_registries" ON public.registries FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_registries" ON public.registries FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for registry_items
CREATE POLICY "select_registry_items" ON public.registry_items FOR SELECT
  TO public USING (registry_id IN (SELECT id FROM public.registries WHERE is_public = true));
CREATE POLICY "manage_own_registry_items" ON public.registry_items FOR ALL
  TO authenticated USING (registry_id IN (SELECT id FROM public.registries WHERE user_id = auth.uid()));

-- RLS Policies for growth_tracking
CREATE POLICY "select_own_tracking" ON public.growth_tracking FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_tracking" ON public.growth_tracking FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_tracking" ON public.growth_tracking FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_tracking" ON public.growth_tracking FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for consultations
CREATE POLICY "select_own_consultations" ON public.consultations FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_consultations" ON public.consultations FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_consultations" ON public.consultations FOR UPDATE
  TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for experts (public read)
CREATE POLICY "select_experts" ON public.experts FOR SELECT
  TO public USING (true);

-- RLS Policies for reviews (public read approved)
CREATE POLICY "select_reviews" ON public.reviews FOR SELECT
  TO public USING (is_approved = true);
CREATE POLICY "select_own_reviews" ON public.reviews FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_review" ON public.reviews FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);