# syntax=docker/dockerfile:1
FROM node:18-buster-slim

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /frontend

RUN apt-get update \
    && apt-get install -y build-essential ca-certificates --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY package.json /frontend/

RUN npm install --loglevel verbose

COPY . /frontend/

RUN npm run build

RUN chmod +x /frontend/prod.entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/frontend/prod.entrypoint.sh"]
