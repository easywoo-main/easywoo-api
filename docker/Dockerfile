# Вказуємо базовий образ
FROM node:22-alpine

# Встановлюємо робочу директорію в контейнері
WORKDIR /

# Копіюємо package.json і package-lock.json (якщо є)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь проєкт
COPY . .

RUN node node_modules/.bin/prisma generate

# Збираємо NestJS-додаток
RUN npm run build

# Виконуємо Prisma міграції перед запуском
CMD npx prisma migrate deploy && node dist/main.js