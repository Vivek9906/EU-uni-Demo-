# American Management University — Website

A complete, production-ready university website built with **Next.js 14**, **PostgreSQL**, **Prisma ORM**, and **Tailwind CSS**.

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **Docker** & **Docker Compose** (for PostgreSQL and Redis)
- **npm** (comes with Node.js)

## Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd amu-university
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your values. At minimum, set:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Generate with: `openssl rand -base64 32`
- SMTP credentials for email notifications

### 3. Start Database Services

```bash
docker-compose up -d
```

### 4. Initialize Database

```bash
npx prisma db push
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000**

## Admin Portal

Access the admin portal at **http://localhost:3000/admin/login**

### Default Admin Credentials
| Field | Value |
|-------|-------|
| Email | admin@euamericanuniversity.us |
| Password | ChangeMe@123! |

> ⚠️ **Change the default password immediately after first login.**

## Project Structure

```
├── app/
│   ├── (public)/          # Public-facing pages (20+)
│   ├── (admin)/admin/     # Admin portal
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Navbar, Footer, AdminSidebar
│   ├── sections/          # Page-specific sections
│   ├── ui/                # Reusable UI components
│   └── admin/             # Admin-specific components
├── lib/
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # NextAuth configuration
│   ├── email.ts           # Email templates & sending
│   ├── rate-limit.ts      # Rate limiter
│   ├── utils.ts           # Utility functions
│   └── validations/       # Zod schemas
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── public/
│   └── uploads/           # User-uploaded files
└── middleware.ts           # Auth & security middleware
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL 15 |
| ORM | Prisma |
| Styling | Tailwind CSS v3 |
| Auth | NextAuth.js |
| Forms | React Hook Form + Zod |
| UI | Radix UI + Custom Components |
| Animations | Framer Motion |
| Email | Nodemailer |
| Icons | Lucide React |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checker |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## Building for Production

```bash
npm run build
npm start
```

## License

© 2025 American Management University. All rights reserved.
