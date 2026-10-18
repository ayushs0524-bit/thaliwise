# ThaliWise 🍛
**The cheapest nutritious week for every family.** Team Synapse · Hack@BVP 8.0 · PS4 Nutri-Equity Engine

A static, zero-backend web app. A linear-programming optimizer (simplex, written in plain JS) finds the lowest-cost weekly food basket that meets every household member's ICMR-NIN based energy, protein, iron and calcium needs. Nothing is stored or sent.

## What's new in v2
- **Per-member allergies** (peanut, milk, lactose, egg, gluten, soy, sesame, fish). A listed allergen is a *hard rule*: foods containing it are removed from the whole household plan before optimizing, locked in the "does not eat" list, and an allergy-safe banner is shown on the plan.
- **Diet patterns:** vegetarian, vegetarian + eggs, non-vegetarian, vegan, Jain.
- **Health options:** diabetes-friendly (no jaggery, half limit on rice/potato, more pulses), millet boost, daily fruit.
- **Bigger food list (35 foods):** jowar, besan, rajma, cauliflower, cabbage, carrot, okra, banana, guava, curd, paneer, sesame, chicken, rohu fish (seasonality included).
- **"Why no plan?" hints:** if constraints are impossible, the app tells you which relaxation makes a plan feasible (it never relaxes allergies or diet).
- **Weekly menu tab:** splits the weekly quantities into a 7-day plan (dals, vegetables and greens rotated; weekly totals unchanged).
- **Live mandi prices (optional):** the Price monitor can fetch Agmarknet prices via `api/prices.js`. Add a free `DATA_GOV_API_KEY` (data.gov.in) in Vercel → Settings → Environment Variables. It covers grains, vegetables and fruit only; if the key or API is unavailable the app keeps sample/manual prices. The commodity names in `MAP` are untested against the live API, so adjust any that return nothing.
- **Share list** (native share sheet, WhatsApp fallback), Hindi + English, read-aloud, large-icon view, print/PDF.

## Run locally
Open `index.html` in a browser, or `npx serve .`
Tests (Node 18+, no dependencies): `npm test`

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → **Add New → Project** → import the repo.
3. Framework Preset: **Other**. Build command: *(empty)*. Output directory: *(empty / root)*. Deploy.

## Project layout
- `index.html`: the whole app (UI, data, optimizer)
- `api/prices.js`: serverless live-price function
- `vercel.json`: security headers + clean URLs
- `tests/optimizer.test.js`: runs diet/allergy scenarios against the optimizer

## Where to edit
- Foods and prices: `FOODS` array in `index.html` (en, hi, icon, group, ₹/kg, kcal, protein, iron, calcium per 100 g, max g/day, tag, cook minutes, season).
- Allergen / diet attributes per food: `TG`. Allergen list: `AL`.

## Honest limits
Prices, nutrient values and requirements are **sample figures**: replace with IFCT/ICMR-NIN and live mandi data before real use. Ingredient filtering cannot detect cross-contact or hidden ingredients in packaged food. Allergy, diabetes and anemia features are decision aids, **not medical advice**.
