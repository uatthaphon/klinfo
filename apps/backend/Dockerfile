# First stage: install dependencies
FROM node:lts-alpine AS deps
WORKDIR /app

RUN apk add --no-cache python3 make g++ && rm -rf /var/cache/apk/*
RUN corepack enable && corepack prepare pnpm@latest --activate

 # Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* ./
COPY apps/backend/package.json ./apps/backend/

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# Second stage: copy source code
FROM node:lts-alpine AS runner
WORKDIR /app

RUN apk add --no-cache python3 make g++ && rm -rf /var/cache/apk/*
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend
EXPOSE 3000
CMD ["pnpm", "start:dev"]
