# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A mix of local homeowners doing their own garden, driveway or paving projects, and local landscapers, builders and contractors who know what they want. Both are in the Mudgee region (NSW) and often check the site on a phone, sometimes from a job site or the yard itself.

## Product Purpose

The website for Putta Bucca Landscapes, a family-owned landscape and building supplies yard at 19 Industrial Ave, Mudgee NSW 2850. It shows the range of bulk and bagged materials, helps people work out how much they need, and gets them to act. Success is a visitor who **phones the yard (0419 669 003)** or **drives in to the yard**. Online quote requests and contact messages are secondary routes.

## Positioning

A local, family-run yard with 10+ years serving Mudgee: real people on the phone, expert advice on what to use and how much, and a flat $30 delivery fee in town. It is not a chain store.

## Operating Context

- Customers browse the products by category, read the details (size, colour, material, density, uses), then call, request a quote, or visit.
- The volume calculator (rectangle, triangle or circle area × depth → m³, plus estimated tonnes using each product's density) is used to work out how much to order. It can hand its results to the contact form as a pre-filled quote message.
- Delivery: flat $30 fee in town; out-of-town rates by phone.
- Opening hours: Mon–Fri 7am–4pm, Sat 8am–1pm.

## Capabilities and Constraints

- Next.js 15 App Router, React 19, plain global CSS (`app/style.css`, `app/components/Calculator.css`), deployed on Vercel with Vercel Analytics.
- Routes: `/`, `/products` (category filter via `?category=`), `/products/[slug]` (static params from the product files), `/services`, `/contact` (prefill via `?subject=&message=`), and `/api/send-quote` (Resend email).
- The product catalogue is edited in Keystatic (`/keystatic`, schema in `keystatic.config.js`) and stored as one YAML file per product in `content/products/`, with each photo in its own folder, `public/images/products/<product>/`. Fields: name, photo, description, category, features and applications, unit, inStock, density, specifications, delivery note and display order. Pages read it through `app/lib/products.js`. Locally edits save to the files; on the live site they commit to GitHub, but Vercel skips builds that only change product content (`scripts/vercel-ignore-build.mjs`). Saved changes go live when an editor presses the floating Publish button in the editor (`app/keystatic/PublishButton.js`), which adds an empty "Publish website changes" commit that always builds. Code pushes still deploy normally and take any saved product changes with them. No prices are shown on the site.
- Public pages live in the `app/(site)` route group so the Keystatic editor at `app/keystatic` renders without the site header, footer and styles.
- The calculator opens site-wide through the `#calculator` hash and the `calculator:open` / `calculator:close` window events.
- The contact page form currently shows a thank-you alert and does not send an email. This is existing behaviour; leave it as is unless asked.
- Production runs on Linux, so image paths are case-sensitive.

## Brand Commitments

- Name: Putta Bucca Landscapes (also styled "Putta-Bucca Landscape Supplies" in metadata).
- Logo: `public/images/Logo.png` (green leaf inside a grey gear, script wordmark, "LANDSCAPING SUPPLIES", phone number) and `public/images/favicon.png` (the leaf-and-gear mark alone). Keep both.
- Voice: plain, friendly, local, practical. Not corporate and not gimmicky-rustic.
- Social: Facebook and Instagram links in `app/config/site.config.js`.

## Evidence on Hand

- Real photos: `LandingPage.jpg` (the yard's cut-steel saw-blade sign on a sandstone block), `Services.jpg` (the company's tipper truck at the yard; the bottom edge carries a phone-screenshot home bar that must be cropped out), and one photo per product in `public/images/`.
- Claims on hand: family owned and operated, 10+ years of experience, serving the Mudgee region, $30 in-town delivery.
- No testimonials, reviews, customer counts or prices. Do not invent them.

## Product Principles

1. The phone number and the yard's address are always within reach. Calling and visiting are the goals.
2. Materials first: let people see and identify the stone, soil, sand and mulch quickly.
3. Help people work out quantities with confidence; the calculator is a core tool, not an extra.
4. Read like a local family yard: honest, plain and helpful.
5. Works well one-handed on a phone, outdoors.

## Accessibility & Inclusion

Users are often outdoors on phones in bright light: strong contrast, large tap targets and readable body text are required.
