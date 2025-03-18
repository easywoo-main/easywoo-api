#!/bin/sh

echo "Building application..."
npm run build

echo "Generating prisma client..."
npm run prisma:generate

echo "Running migrations..."
npm run prisma:migrate:deploy

echo "Running seeds..."
npm run seed

echo "Starting application..."
exec npm run start:prod
