# Stage 1: Build React
FROM node:20-alpine as build-stage
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Serve with Node
FROM node:20-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install --production
COPY server/ ./server/
COPY --from=build-stage /app/client/dist ./client/dist

ENV PORT=8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD curl -f http://localhost:8080/api/health || exit 1

CMD ["node", "server/index.js"]
