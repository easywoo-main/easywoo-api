#!/bin/sh

echo "Running migrations..."
npm run migrate

echo "Bulding the app..."

echo "Starting application..."
exec npm run start:prod

