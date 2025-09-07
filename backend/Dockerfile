# --- Stage 1: Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# รัน prisma generate หลังจาก install เสร็จ
RUN npx prisma generate

# รัน build TypeScript
RUN npm run build

# --- Stage 2: Production Stage ---
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
# RUN npm install --omit=dev
RUN npm install

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3001
CMD ["npm", "start"]
