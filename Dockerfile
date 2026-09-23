FROM node:24-alpine
WORKDIR /app

COPY . .
RUN corepack enable && pnpm install --no-frozen-lockfile --ignore-scripts
RUN pnpm build

EXPOSE 8083
ENV PORT=8083
ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
