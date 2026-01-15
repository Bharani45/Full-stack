# Stage 1: Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production Stage
FROM node:20-alpine
WORKDIR /app
# Only copy production dependencies
COPY package*.json ./
RUN npm install --only=production
# Copy source code from host or previous stage
COPY --from=build /app . 
EXPOSE 4000
CMD ["node", "server.js"]