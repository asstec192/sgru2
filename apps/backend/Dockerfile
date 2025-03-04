# Use a base image with Node.js
FROM node:20.12.2-alpine3.18 AS base

# Stage 1: Builder (prune and prepare the workspace)
FROM base AS builder
RUN apk add --no-cache libc6-compat python3 make g++ \
    && apk update
WORKDIR /app
RUN npm install -g turbo
COPY . . 
RUN turbo prune --scope=backend --docker

# Stage 2: Install dependencies
FROM base AS installer
RUN apk add --no-cache libc6-compat python3 make g++ \
    && apk update
WORKDIR /app

# Copy pruned workspace files
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Enable corepack and install dependencies
RUN corepack enable
RUN pnpm install --no-frozen-lockfile

# **Copiar o Prisma e gerar o Prisma Client**
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma
RUN npx prisma generate --schema=apps/backend/prisma/schema.prisma

# Copy the full pruned workspace
COPY --from=builder /app/out/full/ .

# Build the project
RUN pnpm dlx turbo run build --filter=backend

# Stage 3: Runner (production image)
FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 adonisjs
RUN adduser --system --uid 1001 adonisjs
USER adonisjs

# Copy necessary files from the installer stage
COPY --from=installer /app .

# **Rodar migrações no banco de dados antes de iniciar o servidor**
CMD npx prisma db push --schema=apps/backend/prisma/schema.prisma && node apps/backend/build/bin/server.js
