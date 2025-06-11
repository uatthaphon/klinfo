# Clinic SaaS Docker Setup

This repository contains a simple Docker Compose configuration to run both the backend and frontend applications.

## Requirements
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [pnpm](https://pnpm.io/) (comes bundled with modern Node via `corepack`)

## Usage
1. Clone the repository and ensure Docker is installed.
2. Copy `.env` from the provided example and adjust values if needed.
3. Run `docker-compose up --build` from the project root.
4. The backend will be available at `http://localhost:3000` and the frontend at `http://localhost:3001`.

The stack now includes PostgreSQL and Redis (for BullMQ) with data persisted in local Docker volumes.
