FROM node:22-alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apk update && apk add bash

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci

COPY ./ /app

COPY /docker/entrypoint.sh /app/docker/entrypoint.sh

#RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#    && mkdir -p /home/pptruser/Downloads /app \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /app

#USER pptruser

RUN chmod +x /app/docker/entrypoint.sh

CMD ["/app/docker/entrypoint.sh"]
