FROM node:18-bullseye-slim AS builder
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-bullseye-slim
ENV NODE_ENV dev
USER node
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN npm ci --production
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3030

CMD ["node", "dist/main/server.js"]