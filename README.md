# Travel Planner

A simple app for organizing what to book and budget for upcoming trips.

## Features

- Multiple trips, each with dates, destination, currency and a total budget
- A countdown to departure
- Bookings and costs list: flights, accommodation, ground transport, activities, insurance, food and spending money
- Status for each item: **To book**, **Booked**, **Paid**, or **Spending budget** (tap the status to move it along)
- Estimated vs. actual cost, with actual cost used once something is booked
- "Book next" list sorted by book-by deadline, with overdue and soon-due items flagged
- Budget summary (planned, paid, left to plan or over budget) and a breakdown by category
- **Sign in and sync** your trips across devices with Supabase; see [SUPABASE-SETUP.md](SUPABASE-SETUP.md)
- Export and import a backup file
- **Find options:**
  - **Flights:** opens Google Flights with your airports, dates and travellers filled in, and lets you add the flight you choose.
  - **Hotels and Things to do:** search Google Maps for places with photos, ratings, price levels and price ranges, then add them to your trip in one tap. Uses your own Google Maps API key, saved only in your browser; see [GOOGLE-PLACES-SETUP.md](GOOGLE-PLACES-SETUP.md).
  - **Advanced:** live flight fares and nightly hotel rates through a small helper server; see [PRICE-SEARCH-SETUP.md](PRICE-SEARCH-SETUP.md).
  - Without any setup, you can preview each tab with clearly marked sample results.

## Files

- `index.html` — the whole app
- `config.js` — your Supabase project details for sync (empty means sync is off)
- `supabase/schema.sql` and `SUPABASE-SETUP.md` — the database table and how to set up sync
- `GOOGLE-PLACES-SETUP.md` — how to connect Google search for hotels and things to do
- `worker/worker.js` and `PRICE-SEARCH-SETUP.md` — optional helper for live flight and hotel prices

## Running it

The app is plain HTML and JavaScript with no build step.

**On GitHub Pages:**

1. In this repo on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute, the app is live at `https://zenayefrederick.github.io/Travel-Planner/`.

**On your computer:** open a terminal in this folder and run `python3 -m http.server 8000` (on Windows, `python -m http.server 8000`), then go to `http://localhost:8000`. Opening `index.html` directly also works, but sync and Google search need the local server.

## Your data

Without sync, trips are saved in your browser, so they stay on that device. With sync on, they're also saved to your Supabase database and appear wherever you sign in. **Export backup** saves a copy as a file at any time; **Import backup** adds trips from a backup without removing the ones you have.
