Deliverables

Files created:
- lib/supabaseClient.ts
- middleware.ts
- app/login/page.tsx
- app/register/page.tsx
- app/forgot-password/page.tsx
- app/account/settings/page.tsx
- supabase/profiles_schema.sql

Files modified:
- components/header.tsx
- app/account/page.tsx

Supabase schema (profiles):
- Table: profiles
  - id (uuid, PK, references auth.users.id)
  - full_name (text)
  - email (text)
  - phone (text)
  - address (text)
  - created_at (timestamptz)
  - updated_at (timestamptz)

Authentication setup:
- Uses @supabase/supabase-js client in `lib/supabaseClient.ts`
- Login/Register pages call Supabase Auth APIs
- On successful sign-in or sign-up the client sets a cookie `moms_sb_token` with the access token

Middleware implementation:
- `middleware.ts` checks for `moms_sb_token` cookie and redirects unauthenticated users to `/login`
- Root `/` redirects to `/login` when not authenticated and to `/home` when authenticated

Protected routes:
- Middleware protects paths that start with: /home, /shop, /subscriptions, /account, /cart, /wishlist, /orders, /appointments, /checkout

Profile synchronization logic:
- On registration, we upsert a row in `profiles` with the Supabase user id
- Account page and Header fetch the profile from `profiles` table and display name, email, phone, address
- Settings page allows editing `full_name`, `phone`, `address` and upserts into `profiles`
- Sign out clears Supabase session and the `moms_sb_token` cookie

Notes & next steps:
- Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in `.env`
- If your Supabase project requires email confirmation, registration flow will redirect to `/login` after sign-up
- For server-side session verification in middleware consider adding `@supabase/auth-helpers-nextjs` for robust session handling

If you'd like, I can:
- Wire server-side middleware to validate the session with Supabase tokens
- Add UI for the account header/profile dropdown
- Run a quick local test flow and fix any runtime issues
