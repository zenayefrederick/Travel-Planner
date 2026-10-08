# Setting up Google search for hotels and things to do

The **Hotels** and **Things to do** tabs in **Find options** use Google's Places API to show photos, ratings, Google's price level ($ to $$$$) and a price range when Google has one. It runs straight from the app with your own Google Maps API key. No extra server is needed.

It takes about 10 minutes, once.

## What it costs

Google gives a free monthly allowance. With the details this app asks for, that's about **1,000 searches** and **1,000 photos** a month at no charge ([Google Maps pricing](https://developers.google.com/maps/billing-and-pricing/pricing)). Each search shows up to 10 places. For personal trip planning you're unlikely to go past it, but step 5 shows how to put a hard cap in place so you can never be charged by surprise.

Google requires billing to be turned on in your Google Cloud project, even when you stay inside the free allowance.

## 1. Pick or create a project

1. Go to [console.cloud.google.com](https://console.cloud.google.com).
2. Use the project picker at the top to choose a project, or select **New project** and name it something like `travel-planner`.
3. Make sure billing is linked: **☰ menu → Billing**. If it asks, link a billing account.

## 2. Turn on the two APIs

Enable both of these in your project (open each link, check the project at the top, then select **Enable**):

- [Maps JavaScript API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)
- [Places API (New)](https://console.cloud.google.com/apis/library/places.googleapis.com)

Make sure it's **Places API (New)**, not the older "Places API".

## 3. Create the key

1. Go to **APIs & Services → [Credentials](https://console.cloud.google.com/apis/credentials)**.
2. Select **Create credentials → API key**. Copy the key; it starts with `AIza`.

## 4. Lock the key to your site (important)

Your key lives in your browser, so it's possible for someone to see it. These restrictions make it useless anywhere except your own app.

On the key's page (select the key's name under **Credentials**):

1. Under **Application restrictions**, choose **Websites** and add:
   - `https://zenayefrederick.github.io/*`
2. Under **API restrictions**, choose **Restrict key** and tick only:
   - **Maps JavaScript API**
   - **Places API (New)**
3. Select **Save**. Changes can take a few minutes to start working.

## 5. Optional: set a hard limit

To make sure you never go past the free allowance:

1. Go to **APIs & Services → Enabled APIs & services → Places API (New) → Quotas & system limits**.
2. Find the per-day request limit, select **Edit**, and set it to `30`. That keeps you under 1,000 a month.

You can also set a budget alert under **Billing → Budgets & alerts**, for example at $1.

## 6. Add the key to the app

1. Open your Travel Planner at `https://zenayefrederick.github.io/Travel-Planner/`.
2. In **Find options**, select **Settings**.
3. Paste your key under **Google Maps API key** and select **Save**.

Go to **Hotels** or **Things to do**, check the city in **Where**, and select **Search**.

The key is saved only in that browser. On your phone or another computer, paste it into Settings there too.

## How the results work

- **Hotels** show Google's price level, not nightly rates; Google doesn't share room prices through this API. When you select **Add to trip**, the item opens so you can type the price you find on the hotel's site.
- **Things to do** show a price range when Google lists one, and **Add to trip** uses the low end times your number of travellers. If there's no range, you'll be asked for an estimate.
- **Flights** don't use this API. The Flights tab opens Google Flights with your airports and dates filled in. When you find a flight, use **Add a flight** to save it with its price. (For flight fares inside the app, see the advanced option in [PRICE-SEARCH-SETUP.md](PRICE-SEARCH-SETUP.md).)

## Troubleshooting

| What you see | What to do |
|---|---|
| "Google rejected the API key" | Check both APIs are enabled, billing is linked, and the website restriction is exactly `https://zenayefrederick.github.io/*`. Wait 5 minutes after changing restrictions. |
| "Couldn't load Google Maps" | Check your internet connection. Google search doesn't work in the Claude preview or when opening `index.html` straight from your computer; use your GitHub Pages site. |
| Search worked yesterday but fails today | You may have hit the daily limit from step 5. It resets the next day. |
