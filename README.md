# Zlang - A Next.js Project with Drizzle ORM & Neon Database

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Database Architecture: Drizzle ORM & Neon DB

### What is Drizzle ORM?
**Drizzle** is a lightweight, TypeScript-first ORM (Object-Relational Mapping) that provides:
- Type-safe SQL queries with full TypeScript support
- Zero-runtime overhead and minimal bundle size
- Schema definition in TypeScript code
- Automatic migrations and schema management through Drizzle Kit

### What is Neon DB?
**Neon** is a serverless PostgreSQL database platform that provides:
- Fully managed PostgreSQL database hosted on the cloud
- Automatic scaling and pay-per-use pricing
- Instant database provisioning without infrastructure management
- Perfect for Next.js applications deployed on Vercel

## Database Workflow & Commands

### Database Studio Command
```bash
npm run db:studio
# Runs: npx drizzle-kit studio
```
**Purpose:** Opens Drizzle Studio, a visual database management interface
- Browse and view your database tables in real-time
- Execute SQL queries directly
- Inspect schema structure
- Perfect for development and debugging

### Database Push Command
```bash
npm run db:push
# Runs: npx drizzle-kit push
```
**Purpose:** Syncs your Drizzle schema changes to Neon DB
- Compares your local TypeScript schema with the remote database
- Automatically generates and applies SQL migrations
- Creates new tables, columns, and indexes based on schema changes
- Ensures your database structure matches your code definitions

## Development Flow

1. **Define Schema** → Update your Drizzle schema in TypeScript
2. **Generate Migrations** → Run `npm run db:push` to push changes to Neon DB
3. **Verify Changes** → Use `npm run db:studio` to view and inspect the database
4. **Query Data** → Use Drizzle ORM in your Next.js API routes and server actions
5. **Deploy** → Changes are safely deployed with your application

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Commands

- `npm run db:studio` - Open Drizzle Studio for visual database management
- `npm run db:push` - Push schema changes from your code to Neon DB

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Neon Database Documentation](https://neon.tech/docs/introduction)
- [Drizzle Kit CLI Reference](https://orm.drizzle.team/kit-docs/overview)


npx shadcn@2.1.0 add button 