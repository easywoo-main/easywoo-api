FROM node:22-alpine

WORKDIR /app

COPY ../package.json ../package-lock.json* ./
RUN npm install

COPY . .

COPY docker/entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

CMD ["/app/entrypoint.sh"]
