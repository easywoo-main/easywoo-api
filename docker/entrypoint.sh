#!/bin/sh

echo "Generating Prisma client..."
npm run prisma:generate

echo "Running Prisma migrations..."
npm run prisma:migrate:deploy

echo "Starting application..."
exec npm run dev

