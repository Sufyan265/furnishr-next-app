
# Furnishr Commerce

Premium furniture commerce built on modern Next.js architecture for high-conversion product discovery, seamless checkout, and operationally reliable order notifications.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.9.1-FFCA28?logo=firebase&logoColor=black)
![Genkit](https://img.shields.io/badge/Genkit-1.20.0-4285F4?logo=google&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-Component_Primitives-161618?logo=radixui&logoColor=white)

## Tech Stack

| Layer | Technology | Version / Notes |
|---|---|---|
| Framework | Next.js | 16.0.7 (App Router, Turbopack in dev) |
| UI Runtime | React, React DOM | 18.3.1 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.1 + `tailwindcss-animate` |
| Component System | Radix UI + shadcn-style UI | Multiple `@radix-ui/*` primitives |
| Forms & Validation | React Hook Form + Zod | 7.54.2 + 3.24.2 |
| Backend Services | Firebase | 11.9.1 (Auth, Firestore, Hosting-ready setup) |
| AI Tooling | Genkit + Google GenAI | 1.20.0 / 1.25.0 integration |
| Email/Notifications | Nodemailer (Brevo SMTP) | 7.0.11 |
| Charts/Animation | Recharts, Framer Motion | 2.15.1, 11.5.7 |

## Key Features

- App Router commerce experience with dedicated pages for product discovery, product detail, cart, checkout, wishlist, account, blog, and brand content.
- Variant-rich catalog model supporting dimensions, sizes, color selections, mattress upsells, and promotional pricing logic.
- Persistent cart and wishlist state via React Context + `localStorage` hydration.
- Structured checkout flow with stepper UX (Shipping -> Review & Confirm) and schema validation through Zod.
- Operational order notification pipeline using `/api/send-order-email` with SMTP-backed delivery (Brevo).
- Firebase integration for client app initialization and server-side admin workflows.
- Embedded trust and conversion UX elements: delivery banner, review interactions, social proof popup, live chat widget, and countdown promotions.
- Theme-aware UI foundation (`next-themes`) with reusable primitives in `src/components/ui`.
- AI-ready module foundation under `src/ai` for future personalization and intelligent commerce workflows.

## Project Structure

```text
.
├── src/
│   ├── app/                      # Next.js App Router pages + route handlers
│   │   ├── api/send-order-email/route.ts
│   │   ├── products/             # Product listing and detail routes
│   │   ├── checkout/             # Multi-step checkout flow
│   │   ├── account/              # User account pages
│   │   ├── blog/                 # Content routes
│   │   └── ...                   # Marketing and support pages
│   ├── components/
│   │   ├── ui/                   # Reusable UI primitives
│   │   ├── checkout/             # Checkout-specific UI
│   │   └── home/                 # Homepage composition sections
│   ├── context/                  # Cart and wishlist state providers
│   ├── firebase/                 # Client/admin firebase setup + helpers
│   ├── lib/                      # Domain data, types, utilities
│   ├── ai/                       # Genkit setup and AI schemas
│   └── dataconnect-generated/    # Generated Firebase Data Connect client
├── dataconnect/                  # Data Connect schema and query scaffolding
├── public/images/                # Product and hero media assets
├── server.js                     # Optional custom Node server entry
└── next.config.ts                # Next.js runtime configuration
```

## Getting Started

### 1. Prerequisites

- Node.js 20+
- npm 9+
- Firebase project credentials (client config + service account JSON)
- Brevo SMTP credentials for order email delivery

### 2. Installation

```bash
git clone <your-repository-url>
cd Furnishr-ecommerce
npm install
```

### 3. Environment Setup

Create `.env.local` in the project root:

```bash
# Firebase Client (public)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_MESSAGING_APP_ID=your-messaging-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Firebase Admin (server-only)
FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'

# Brevo SMTP (server-only)
BREVO_HOST=smtp-relay.brevo.com
BREVO_PORT=587
BREVO_USER=your-brevo-user
BREVO_SMTP_KEY=your-brevo-smtp-key
ADMIN_EMAIL=orders@yourdomain.com

# Optional Integrations
NEXT_PUBLIC_TAWK_TO_ID=your-tawk-to-id
NEXT_PUBLIC_WHATSAPP_NUMBER=your-whatsapp-number

# Runtime
PORT=3000
```

### 4. Run the App

Development (Turbopack, port `9002`):

```bash
npm run dev
```

Production workflow:

```bash
npm run build
npm run start
```

Quality gates:

```bash
npm run lint
npm run typecheck
```

## Usage

### Web App Routes

- `/` - Homepage and merchandising blocks
- `/products` - Catalog browsing
- `/products/[slug]` - Product detail with variants, reviews, and Q&A
- `/cart` - Cart management
- `/checkout` - Shipping and order review flow
- `/wishlist` - Saved products
- `/account` - Account area
- `/blog` - Editorial content and guides

### Order Notification API

Endpoint:

- `POST /api/send-order-email`

Example request:

```bash
curl -X POST http://localhost:9002/api/send-order-email \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Jane Doe",
		"email": "jane@example.com",
		"phone": "+44 7000 000000",
		"address": "221B Baker Street, London, NW1 6XE, UK",
		"order": "New Order Received..."
	}'
```

Expected responses:

- `200`: `{ "success": true, "messageId": "..." }`
- `400`: Missing required payload fields
- `500`: SMTP/environment configuration errors

## Contributing

Contributions are welcome through focused, reviewable pull requests.

1. Fork the repository.
2. Create a feature branch.
3. Commit with clear, descriptive messages.
4. Run linting and type checks.
5. Open a pull request with context, screenshots (if UI), and testing notes.

## License

MIT (placeholder). Update this section with your final legal license terms before public distribution.
