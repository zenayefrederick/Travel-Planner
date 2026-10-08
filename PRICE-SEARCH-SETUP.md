# Setting up live price search

The **Find options** panel shows real prices from Google Flights, Google Hotels and Google Maps. It gets them through [SerpApi](https://serpapi.com), using a small helper that runs free on Cloudflare and keeps your API key private.

You'll set this up once. It takes about 10 minutes.

```
Travel Planner (GitHub Pages)  →  your helper (Cloudflare Worker)  →  SerpApi  →  Google results
                                   holds your API key
```

## Why a helper?

Your app runs in the browser, so anything inside it is public, including an API key. If the key were in `index.html`, anyone could copy it and use up your searches. The helper keeps the key on Cloudflare's side, only answers requests from your own site, and caches results for 6 hours so repeat searches don't count against your allowance.

## 1. Get a SerpApi key

1. Sign up at [serpapi.com](https://serpapi.com/users/sign_up). The free plan includes 250 searches a month.
2. Open your [dashboard](https://serpapi.com/manage-api-key) and copy your **API key**.

Each tab you search (Flights, Hotels or Things to do) uses one search. Searching the same thing again within 6 hours is free.

## 2. Create the helper on Cloudflare

1. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com/sign-up). The free plan is enough.
2. In the left menu, go to **Compute (Workers) → Workers & Pages**, then select **Create** → **Start with Hello World!** (Cloudflare sometimes renames these menus; you're looking for "create a Worker").
3. Name it something like `travel-planner-helper` and select **Deploy**.
4. Select **Edit code**. Delete everything in the editor, paste in the full contents of [`worker/worker.js`](worker/worker.js) from this repo, and select **Deploy**.

## 3. Add your key and your site's address

In your Worker, go to **Settings → Variables and Secrets** and add these two:

| Type | Name | Value |
|---|---|---|
| **Secret** | `SERPAPI_KEY` | your SerpApi API key |
| Text | `ALLOWED_ORIGIN` | `https://zenayefrederick.github.io` |

Use **Secret** for the key so it's hidden after you save it. `ALLOWED_ORIGIN` is just the start of your site's address, with no path and no slash at the end. Select **Deploy** (or **Save and deploy**) after adding them.

**Check it:** open your Worker's address (shown at the top, like `https://travel-planner-helper.yourname.workers.dev`) in a browser. You should see `"ok": true` and `"apiKeySet": true`.

## 4. Connect the app

1. Open your Travel Planner at `https://zenayefrederick.github.io/Travel-Planner/`.
2. In **Find options**, select **Settings**.
3. Paste your Worker's address and select **Test connection**, then **Save**.

That's it. Pick a tab, check the dates and places, and select **Search**. **Add to trip** puts a result into your bookings with its price as the estimate, and the notes include a link to book it.

## Good to know

- **Prices change.** They're a snapshot from when you searched. The date is saved in each item's notes.
- **Flights:** prices are round trip when the trip has a return date, for the number of travellers on the trip. Results show the outbound flight; open Google Flights to choose the return and book.
- **Hotels:** the price shown is the total for the whole stay. For a trip with several cities, change **Where** and the dates and search again for each stop.
- **Things to do:** Google Maps doesn't always list ticket prices. When it doesn't, add the item and type your own estimate.
- **Booking** happens on the airline, hotel or tour website. The app finds options and tracks your budget; it can't buy anything for you.
- **Testing locally?** Opening `index.html` straight from your computer won't pass the `ALLOWED_ORIGIN` check. Use the GitHub Pages site, or temporarily set `ALLOWED_ORIGIN` to `*` while testing and change it back afterward.

## Troubleshooting

| What you see | What to do |
|---|---|
| "Couldn't reach the price search helper" | Check the address in Settings. Make sure `ALLOWED_ORIGIN` matches your site exactly, with no slash at the end. |
| "This site isn't allowed to use this helper" | Same as above: fix `ALLOWED_ORIGIN`. |
| "The helper has no SERPAPI_KEY secret set" | Add the secret in step 3 and deploy again. |
| "Your account has run out of searches" | You've used this month's 250 searches. Wait for the reset or upgrade on SerpApi. |
| "Enter 3-letter airport codes" | Use airport codes like `YXE` (Saskatoon) or `LIS` (Lisbon), not city names. |
