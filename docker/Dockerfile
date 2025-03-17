FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . /app

RUN chmod +x /app/docker/entrypoint.sh

CMD ["/app/docker/entrypoint.sh"]
