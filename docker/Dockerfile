FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json /

RUN npm ci

COPY ./ /app

COPY /docker/entrypoint.sh /app/docker/entrypoint.sh

RUN chmod +x /app/docker/entrypoint.sh

CMD ["/app/docker/entrypoint.sh"]
