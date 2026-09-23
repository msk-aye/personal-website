FROM node:24-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
RUN corepack enable && pnpm install --frozen-lockfile --prod

EXPOSE 8083
ENV PORT=8083
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
