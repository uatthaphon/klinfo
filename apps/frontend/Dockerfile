# Install dependencies from root
FROM node:lts-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY ../../pnpm-workspace.yaml ./
COPY ../../package.json ../../pnpm-lock.yaml* ./
COPY ../../apps/frontend/package.json ./apps/frontend/
RUN pnpm install

# Rebuild app
FROM node:lts-alpine AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps ./apps
COPY ../../apps/frontend ./apps/frontend
EXPOSE 3000
WORKDIR /app/apps/frontend
CMD ["pnpm", "dev"]
