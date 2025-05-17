FROM node:22-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=build /app /app

RUN npm install --omit=dev

EXPOSE 3001

# WICHTIG: prisma push erst zur Laufzeit, wenn env geladen ist
CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]