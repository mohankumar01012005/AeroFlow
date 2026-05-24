# AeroFlow

AeroFlow is a full-stack flight booking application built with Next.js and Supabase. It provides a complete customer booking journey including authentication, flight discovery, seat selection, passenger details capture, booking confirmation, ticket viewing, PDF ticket download, and booking cancellation.

## Project Walkthrough  : https://drive.google.com/file/d/1d7SKoOVm6eDMl926bhMFo-OKzkA4w0pZ/view?usp=sharing
## Overview

This project is structured as a repository root with the application source located in `aero-flow/`. The app uses the Next.js App Router for the frontend experience and Supabase for authentication, database access, and backend RPC workflows.

The current implementation focuses on an airline-style booking flow for domestic routes, with persisted client-side booking state and protected booking routes.

## Key Features

- Email/password authentication with Supabase Auth
- Flight search by origin, destination, and date
- Flight listing with client-side sorting
- Seat map selection for a chosen flight
- Passenger details form with schema validation using Zod and React Hook Form
- Booking review and confirmation flow
- Booking history screen for authenticated users
- Ticket detail page with PDF download support
- Booking cancellation through Supabase RPC
- Protected booking routes via Next.js middleware
- Persisted booking and recent-search state with Zustand
- Supabase migration and seed files included in the repository

## Tech Stack

- Framework: Next.js 16
- Language: TypeScript
- UI: React 19, Tailwind CSS 4
- State Management: Zustand
- Forms and Validation: React Hook Form, Zod
- Backend Platform: Supabase
- Notifications: Sonner
- PDF Generation: jsPDF
- Deployment Target: Vercel

## Application Flow

1. Users register or log in with Supabase Auth.
2. Authenticated users search for flights from the home page.
3. Matching flights are fetched from Supabase and displayed with sorting controls.
4. Users select a flight and continue to the seat map.
5. Seat availability is loaded from Supabase and updated in near real time.
6. Users enter passenger details and review the booking.
7. Booking confirmation is executed through the `book_seat` Supabase RPC.
8. Users can view ticket details, download a PDF ticket, and cancel bookings from the bookings area.

## Repository Structure

```text
AeroFlow/
|-- README.md
`-- aero-flow/
    |-- package.json
    |-- next.config.ts
    |-- vercel.json
    |-- supabase/
    |   |-- config.toml
    |   |-- seed.sql
    |   `-- migrations/
    |-- public/
    `-- src/
        |-- app/
        |-- components/
        |-- lib/
        |-- stores/
        |-- types/
        `-- utils/
```

## Notable Directories

- `aero-flow/src/app`: App Router pages and route segments
- `aero-flow/src/components`: Shared, flight, seat, and booking UI components
- `aero-flow/src/lib/supabase`: Browser and server Supabase client factories
- `aero-flow/src/stores`: Zustand stores for auth and booking flow state
- `aero-flow/src/types`: Shared TypeScript domain types
- `aero-flow/supabase/migrations`: Database schema migration files
- `aero-flow/supabase/seed.sql`: Local seed data for sample flight records

## Architecture Notes

### Frontend

- Built with the Next.js App Router
- Uses client components for interactive booking screens
- Uses middleware to protect booking routes for unauthenticated users
- Stores transient booking flow state in Zustand with persistence

### Backend and Data

- Supabase Auth manages user registration and sign-in
- Supabase Postgres stores flights, seats, bookings, passengers, and reschedules
- RPC functions are used by the app for booking creation and cancellation
- Server-side and client-side Supabase clients are separated under `src/lib/supabase`

## Database Model

The migration defines the following primary entities:

- `flights`
- `seats`
- `bookings`
- `passengers`
- `reschedules`

It also defines supporting enums for:

- `booking_status`
- `flight_status`
- `seat_class`

The schema includes indexes, row-level security enablement, and `updated_at` triggers.

## Authentication and Authorization

- Authentication is handled with Supabase email/password auth
- Session state is synchronized into a Zustand auth store through `AuthProvider`
- Booking routes under `/booking` are guarded by `src/middleware.ts`
- The bookings table includes an RLS policy that restricts reads to the owning user

## Environment Variables

Create `aero-flow/.env.local` with the following values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These variables are required by:

- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/middleware.ts`

## Getting Started

### Prerequisites

- Node.js 20 or later recommended
- npm 10 or later recommended
- A Supabase project
- Supabase CLI if you want to run migrations and seed locally

### Installation

```bash
cd aero-flow
npm install
```

### Run the Application

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

From `aero-flow/`:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Supabase Setup

### Option 1: Connect to a Hosted Supabase Project

1. Create a Supabase project.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
3. Apply the SQL in `supabase/migrations/20260519171412_initial_schema.sql`.
4. Ensure the RPC functions used by the app exist: `book_seat` and `cancel_booking`.
5. Seed or insert flights and seats for testing.

### Option 2: Run Supabase Locally

```bash
cd aero-flow
supabase start
supabase db reset
```

If you use the local workflow, review the migration and seed files before reset so the local schema matches the app expectations.

## Deployment

The project is configured for Vercel deployment through `vercel.json`.

Recommended production setup:

1. Import the repository into Vercel.
2. Set the Supabase environment variables in the Vercel project settings.
3. Build with `npm run build`.
4. Verify authentication redirects and booking RPC permissions in the target environment.

## Current Implementation Notes

This README is based on the code currently in the repository. A few areas are important to know before running or presenting the project:

- The application source lives in `aero-flow/`, not at the repository root.
- The app expects Supabase RPC functions named `book_seat` and `cancel_booking`, but those function definitions are not present in the checked-in migration file.
- The checked-in seed file references a `total_seats` column that is not defined in the current migration, so the seed script likely needs adjustment before use.
- The booking flow depends on seat records being present for each flight.

## Quality and Tooling

- ESLint is configured through `eslint.config.mjs`
- TypeScript is enabled through `tsconfig.json`
- Tailwind CSS 4 is configured through PostCSS
- The codebase follows a component-based structure with shared domain types

## Suggested Next Improvements

- Add missing Supabase RPC definitions to source control
- Align the seed file with the current schema
- Add automated tests for booking flow and auth redirects
- Add explicit environment variable examples in a checked-in `.env.example`
- Normalize UI text encoding issues visible in some components
- Document database bootstrap steps for seats and sample accounts

## Contributing

1. Fork or clone the repository.
2. Create a feature branch.
3. Make changes inside `aero-flow/`.
4. Run linting and verify the booking flow manually.
5. Open a pull request with a clear summary of functional changes.


