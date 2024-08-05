FROM mcr.microsoft.com/devcontainers/javascript-node:20 AS dev

FROM node:20.16-bullseye-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20.16-alpine

WORKDIR /app

COPY --from=build /app/node_modules .

RUN npm ci --omit=dev

COPY --from=build /app/dist .
COPY --from=build /app/package*.json .

ENTRYPOINT [ "node", "./dist/main.js" ]