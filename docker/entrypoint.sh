#!/bin/sh

echo "Building application..."
npm run build

echo "Running migrations..."
npm run migration

echo "Starting application..."
exec npm run start:prod
