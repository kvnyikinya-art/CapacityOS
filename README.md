# CapacityOS 🚛

**Eliminate Empty Miles. Maximize Every Route.**

CapacityOS is a specialized capacity marketplace that eliminates profit leaks in logistics by monetizing underutilized truck space. Unlike traditional load boards, it enables transporters to sell unused volume and weight on already scheduled routes, maximizing fleet profitability and reducing wasted capacity.

## How It Works

### For Transporters
List your unused truck space on scheduled routes. Set rates per kg or per m³. Turn empty miles into profit.

### For Shippers
Post partial loads and find economical transport on trucks already headed your way. Save on shipping costs.

### For Drivers
Find driving employment opportunities through our recruitment module. Featured profiles get priority placement.

## Revenue Model

| Service | Fee |
|---------|-----|
| Domestic Shipments | 16% of GMV |
| Cross-Border Shipments | 17.5% of GMV |
| Recruitment Services | Placement fees + featured profiles |
| Premium Visibility | Featured carrier promotions |

**Payments:** All transactions are processed via bank-to-bank EFT with manual admin verification. No third-party payment gateways.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** Turso (SQLite via team-db CLI)

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/          # Next.js App Router pages & API routes
│   ├── api/      # REST API endpoints
│   │   ├── auth/
│   │   ├── capacity-listings/
│   │   ├── load-postings/
│   │   ├── shipments/
│   │   ├── invoices/
│   │   ├── payments/
│   │   ├── companies/
│   │   ├── drivers/
│   │   ├── vehicles/
│   │   └── health/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/   # Reusable UI components
├── lib/          # Utilities (db client, helpers)
└── api/          # Additional API utilities
```

## Database Schema

The database schema is documented in `/home/team/shared/schema.sql` (shared team resource). Key tables:

- `users` — Platform users (shipper, transporter, driver, admin)
- `companies` — Transport companies and shipper organizations
- `drivers` — Professional driver profiles (recruitment)
- `vehicles` — Truck/vehicle registry with capacity specs
- `capacity_listings` — Transporters' spare capacity on routes
- `load_postings` — Shippers' partial load requests
- `shipments` — Matched bookings with platform fees
- `invoices` — PDF invoices with TAX/VAT
- `payments` — Manual EFT with admin verification
- `audit_log` — Platform activity trail