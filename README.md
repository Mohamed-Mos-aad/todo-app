# Todo App

A modern Todo dashboard built with **Next.js 16**, **Prisma**, **MongoDB**, and **Clerk Authentication**.

This project started as my first full-stack step as a frontend developer and evolved into a real app flow:
- Auth + protected routes
- User-scoped data
- Dashboard insights
- Paginated task management

## Highlights

- Clerk authentication with local auth pages (`/sign-in`, `/sign-up`)
- Protected app routes through `src/proxy.ts`
- Every todo is linked to the authenticated user (`user_id`)
- Dashboard shows latest **5 unfinished** tasks only
- Dedicated `Tasks` page shows **all tasks** (completed + pending) with pagination
- `Notifications` page provides a lightweight productivity digest
- Graceful error handling with `error.tsx` and `global-error.tsx`

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui |
| ORM | Prisma |
| Database | MongoDB |
| Auth | Clerk |
| Validation | Zod, React Hook Form |

## Current App Flow

- `/sign-in` and `/sign-up` use Clerk components.
- Any non-public route is protected by Clerk middleware.
- Unauthenticated users trying to access `/` (or other app pages) are redirected to auth flow.
- `Dashboard` (`/`) shows:
  - Active/completion/weekly velocity stats
  - Latest 5 pending todos
- `Tasks` (`/tasks`) shows:
  - Full todo list (all statuses)
  - Server-side pagination
- `Notifications` (`/notifications`) shows:
  - Pending vs completed summary
  - This week activity
  - Recent completed and current-focus lists

## Database Model

```prisma
model Todo { 
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  completed   Boolean  @default(false)
  user_id     String
  createdAt   DateTime @default(now())
}
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local`

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
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

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Generate Prisma client + build app
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Optional Seed

```bash
npx prisma db seed
```

## Project Structure (Key Files)

- `src/proxy.ts` - Clerk route protection rules
- `src/app/sign-in/[[...sign-in]]/page.tsx` - Sign in page
- `src/app/sign-up/[[...sign-up]]/page.tsx` - Sign up page
- `actions/todo.actions.ts` - User-scoped todo CRUD + pagination + metrics
- `src/app/page.tsx` - Dashboard logic
- `src/app/tasks/page.tsx` - All tasks page
- `src/app/notifications/page.tsx` - Notification digest page
- `src/app/error.tsx` / `src/app/global-error.tsx` - Error boundaries

## Notes

- In Clerk development mode, you may see development warnings (normal in local environment).
- Keep your keys private and never commit `.env.local`.
