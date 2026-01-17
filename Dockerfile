# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# 1. Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client and Build
RUN \
  if [ -f yarn.lock ]; then npx prisma generate && yarn run build; \
  elif [ -f package-lock.json ]; then npx prisma generate && npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && npx prisma generate && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set correct permissions for nextjs user
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# --- PRISMA ADDITIONS ---
# Copy the prisma directory so migrations and seed script are available
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
# ------------------------

USER nextjs

EXPOSE 3000

# Use shell form for CMD to allow multiple commands via '&&'
# This runs migrations and seeds EVERY time the container starts/restarts
CMD npx prisma@6 migrate deploy && npx prisma@6 db seed && node server.js
