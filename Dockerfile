# --- Stage 1: Build Frontend Assets ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Production Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY server ./server

EXPOSE 5000 5001 5002 5003

# Run cluster orchestrator by default
CMD ["node", "server/cluster.js"]
