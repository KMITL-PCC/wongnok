# --- Stage 1: Build Stage ---
# ใช้ Node.js official image ที่มี Yarn (หรือ npm) ติดตั้งมาให้แล้ว
FROM node:20-alpine AS builder

# กำหนด working directory ภายใน container
WORKDIR /app

# คัดลอก package.json และ package-lock.json (หรือ yarn.lock) เพื่อให้ Docker cache dependencies ได้
COPY package*.json ./
# COPY yarn.lock ./ # หากใช้ yarn

# ติดตั้ง project dependencies
# เราใช้ production dependencies เท่านั้นใน final image ดังนั้นใน build stage ติดตั้งทั้งหมดก่อน
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# รัน build script ของ TypeScript (จาก package.json: "build": "npx tsc")
# ซึ่งจะคอมไพล์ .ts ไฟล์ไปเป็น .js ไฟล์ในโฟลเดอร์ dist/
RUN npm run build

# --- Stage 2: Production Stage ---
# ใช้ Node.js official image ที่เล็กกว่า (alpine) เพื่อให้ image สุดท้ายมีขนาดเล็ก
FROM node:20-alpine

# กำหนด working directory ภายใน container
WORKDIR /app

# คัดลอกเฉพาะ package.json และ package-lock.json อีกครั้ง เพื่อติดตั้งเฉพาะ production dependencies
COPY package*.json ./
# COPY yarn.lock ./ # หากใช้ yarn

# ติดตั้งเฉพาะ production dependencies (ไม่ต้องมี devDependencies เช่น typescript, ts-node)
RUN npm install --omit=dev

# คัดลอกไฟล์ที่คอมไพล์แล้ว (JavaScript) จาก build stage ไปยัง production stage
COPY --from=builder /app/dist ./dist

# คัดลอก public assets หรือไฟล์อื่นๆ ที่จำเป็นสำหรับ runtime (เช่น .env file สำหรับ production)
# หากมีโฟลเดอร์ public หรือ config files ที่จำเป็นต้องใช้ใน runtime
# COPY --from=builder /app/public ./public
# COPY .env.production ./.env # ตัวอย่างการคัดลอกไฟล์ .env สำหรับ production

# กำหนด Port ที่แอปพลิเคชันจะเปิดรับการเชื่อมต่อ
EXPOSE 3001

# กำหนด Command ที่จะรันเมื่อ Container เริ่มต้น
# ใน Production เราจะรันไฟล์ JavaScript ที่คอมไพล์แล้ว
CMD ["npm", "start"]