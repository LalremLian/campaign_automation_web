# Campaign Automation

Marketing automation dashboard with an Express API backend.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) 9+
- [Docker](https://www.docker.com/) (optional, for local PostgreSQL)

## Quick start

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

3. **Start PostgreSQL** (optional — only needed when using the database)

   ```bash
   docker compose up -d
   pnpm --filter @workspace/db run push
   ```

4. **Run the app**

   ```bash
   pnpm dev
   ```

   This starts both services in parallel:

   | Service              | URL                        |
   | -------------------- | -------------------------- |
   | Marketing Dashboard  | http://localhost:5173      |
   | API Server           | http://localhost:8080/api  |

   Or run them individually:

   ```bash
   pnpm dev:api         # API only (port 8080)
   pnpm dev:dashboard   # Dashboard only (port 5173)
   ```

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `pnpm dev`        | Run API + dashboard in development       |
| `pnpm dev:api`    | Run API server only                      |
| `pnpm dev:dashboard` | Run marketing dashboard only          |
| `pnpm build`      | Typecheck and build all packages         |
| `pnpm typecheck`  | Run TypeScript checks across workspace   |

## Project structure

```
artifacts/
  api-server/           Express 5 API
  marketing-dashboard/  React + Vite frontend
  mockup-sandbox/       UI mockup preview tool
lib/
  api-client-react/     Generated React Query hooks
  api-spec/             OpenAPI spec + Orval codegen
  api-zod/              Zod schemas from OpenAPI
  db/                   Drizzle ORM + PostgreSQL
```

## Environment variables

| Variable       | Default                                      | Description                |
| -------------- | -------------------------------------------- | -------------------------- |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/campaign_automation` | Postgres connection string |
| `PORT`         | `8080` (API) / `5173` (dashboard)            | Server port                |
| `API_URL`      | `http://localhost:8080`                      | API URL for Vite proxy     |

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS 4, Wouter
- API: Express 5, Zod validation
- Database: PostgreSQL + Drizzle ORM
