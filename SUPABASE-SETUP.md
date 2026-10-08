# Setting up sign-in and trip sync (Supabase)

With sync on, your trips are saved to your own Supabase database and show up wherever you sign in: your GitHub Pages site, your phone, and `localhost` on your computer. Sign-in uses an emailed link, so there's no password.

It takes about 10 minutes, once. The free Supabase plan is plenty for this.

## 1. Create a Supabase project

1. Sign up at [supabase.com](https://supabase.com/dashboard). You can sign in with GitHub.
2. Select **New project**. Name it `travel-planner`, set a database password (save it somewhere; the app doesn't need it), pick the region closest to you, and create the project.
3. Wait a minute or two while it sets up.

## 2. Create the trips table

1. In your project, open **SQL Editor** from the left menu and select **New query**.
2. Paste in everything from [`supabase/schema.sql`](supabase/schema.sql) and select **Run**. You should see "Success. No rows returned".

This creates one table, `trips`, with security rules so each signed-in person can only see and change their own trips.

## 3. Allow sign-in links back to your app

1. Go to **Authentication → URL Configuration**.
2. Set **Site URL** to:
   ```
   https://zenayefrederick.github.io/Travel-Planner/
   ```
3. Under **Redirect URLs**, select **Add URL** and add both of these:
   ```
   https://zenayefrederick.github.io/Travel-Planner/**
   http://localhost:8000/**
   ```
4. Save.

Email sign-in is on by default, so there's nothing to turn on under **Providers**.

## 4. Add your project details to the app

1. Go to **Project Settings → API Keys** (on some projects it's **Project Settings → API**, or the **Connect** button at the top).
2. Copy the **Project URL**. It looks like `https://abcdefghijklm.supabase.co`.
3. Copy the **publishable** key (starts with `sb_publishable_`). If you only see legacy keys, copy the **anon public** key instead.
4. Open `config.js` in your project folder and paste them in:
   ```js
   window.TRAVEL_PLANNER_CONFIG = {
     supabaseUrl: "https://abcdefghijklm.supabase.co",
     supabaseKey: "sb_publishable_..."
   };
   ```
5. Push to GitHub:
   ```
   git add .
   git commit -m "Turn on trip sync"
   git push
   ```

These two values are meant to be public, so it's fine for them to be on GitHub. The database rules from step 2 are what keep your trips private. **Never** put the `secret` or `service_role` key in `config.js`.

## 5. Sign in

1. Open your Travel Planner. A **Sign in to sync** button appears at the top.
2. Enter your email and select **Email me a link**.
3. Open the email on the same device and select the link. You'll land back in the app, signed in.

Your existing trips upload automatically. Do the same on each device you use. The button shows **Synced** when everything is saved.

## How sync works

- Changes save on your device right away and upload a moment later. If you're offline, they upload when you reconnect.
- When you open the app or come back to its tab, it pulls the latest trips.
- If you edit the same trip on two devices before they sync, the most recent edit wins.
- Deleting a trip deletes it everywhere.
- The example trip isn't synced.
- **Sign out** stops syncing on that device and keeps a copy of your trips there.
- Your Google Maps key and other search settings stay on each device; they aren't synced.

## Good to know

- **Sign-in emails are limited.** Supabase's built-in email sender only sends a few emails per hour, which is fine for just you. If you hit the limit, wait a bit and try again.
- **Free projects pause when unused.** Supabase pauses free projects after a period of inactivity. If sync stops working after a long break, open your Supabase dashboard and restore the project.
- **Running locally** works the same way at `http://localhost:8000` (see the README). Use port 8000 so the sign-in link is allowed.

## Troubleshooting

| What you see | What to do |
|---|---|
| No **Sign in to sync** button | Check `config.js` has both values and is in the same folder as `index.html`. The button doesn't appear when you open `index.html` directly from your computer; use GitHub Pages or `localhost`. |
| The email link opens a page that won't load, or a "redirect" error | Add your site's address to **Redirect URLs** in step 3, exactly as shown. |
| "The trips table is missing" | Run `supabase/schema.sql` from step 2. |
| **Sync issue** with a permission or "row-level security" message | Re-run `supabase/schema.sql`; it resets the security rules. |
| "Too many sign-in emails" | Wait a few minutes and try again. |
