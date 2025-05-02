# Project Start Guide

This guide walks you through the steps to start the TypeScript backend project.

## Prerequisites

- Docker and Docker Compose installed
- Node.js (version ≥ 18)
- Access to the `.env` file (see main README)

## Startup Steps

1. **Start PostgreSQL using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

4. **Seed the database (optional for test data):**
   ```bash
   npm run seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Notes

- Ensure the database container is running and accessible before running Prisma commands.
- If using Infisical for secrets, ensure you have pulled and configured them correctly.