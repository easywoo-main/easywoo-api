#!/bin/sh

echo "Очищення бази даних..."
psql -U ${DATABASE_USERNAME} -d ${DATABASE_NAME} -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
echo "База даних очищена!"

echo "Generating prisma client..."
npm run prisma:generate

echo "Running migrations..."
npm run prisma:migrate:deploy

echo "Running seeds..."
npm run seed

echo "Building application..."
npm run build

echo "Starting application..."
exec npm run start:prod
