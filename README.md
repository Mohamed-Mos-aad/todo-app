# Todo App

A modern Todo dashboard built with **Next.js 16**, **Prisma**, and **MongoDB**.

This is my first project where I handled both sides of the product:
- Frontend experience and UI flow
- Backend data logic with Prisma + MongoDB

It marks my shift from "UI-only projects" to building full features end-to-end.

## Why This Project Matters

Most Todo apps are frontend demos.
This one focuses on real product behavior:

- Persistent data in MongoDB
- Server Actions for CRUD operations
- Server-side pagination
- Real dashboard metrics (completion rate + weekly velocity)

## Features

- Create, edit, and delete todos
- Form validation with `zod` + `react-hook-form`
- Server-rendered data with App Router
- URL-based pagination (`?page=...`)
- Weekly activity insights
- Responsive dashboard layout
- Light/Dark theme support

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui |
| Data Access | Prisma |
| Database | MongoDB |
| Validation | Zod, React Hook Form |

## Project Structure (Highlights)

- `src/app/page.tsx`  
  Main dashboard page, reads `searchParams`, requests paginated data, and renders stats.

- `actions/todo.actions.ts`  
  Server Actions for Todo CRUD, pagination, and dashboard metrics.

- `prisma/schema.prisma`  
  Prisma schema and MongoDB datasource.

## Database Model

```prisma
model Todo { 
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Start development server

```bash
npm run dev
```

Open: `http://localhost:3000`

## Available Scripts

- `npm run dev` - Run in development mode
- `npm run build` - Generate Prisma client, then build Next.js
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Optional Seed

A seed file exists at `prisma/seed.ts`.

```bash
npx prisma db seed
```

## What I Learned

- How to design backend logic with Next.js Server Actions
- How to use Prisma with MongoDB in a real app flow
- How to implement server-side pagination with `skip` and `take`
- How to move from static UI cards to data-driven dashboard metrics

## Roadmap

- Add search and filters
- Add authentication
- Add priority and due dates
- Add tests
- Deploy to production

## Author Note

This project represents a major milestone in my journey as a developer.
Not just building screens, but owning the full feature lifecycle from UI to database.
