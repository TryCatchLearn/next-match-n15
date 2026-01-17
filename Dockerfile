# -------- Base --------
FROM node:20-alpine AS base
WORKDIR /app

# Needed for Prisma on alpine
RUN apk add --no-cache openssl

# -------- Dependencies --------
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

# -------- Build --------
FROM base AS builder

# Prisma + Next require env at build time
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma steps (prod-safe)
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma db seed

# Next build
RUN npm run build

# -------- Runtime --------
FROM base AS runner

ENV NODE_ENV=production

# Optional but recommended
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]