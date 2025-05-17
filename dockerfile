# === STAGE 1: Build & Prisma ===
FROM node:22-alpine as build

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install

# Quellcode + Prisma-Schema
COPY . .

# Prisma vorbereiten
RUN npm run prisma:generate
RUN npm run prisma:push

# Build für TypeScript
RUN npm run build

# === STAGE 2: Slim Production Container ===
FROM node:22-alpine

WORKDIR /app

# Nur das Nötigste übernehmen
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Nur Runtime-Dependencies installieren
RUN npm install --omit=dev

EXPOSE 3001

CMD ["node", "dist/server.js"]
