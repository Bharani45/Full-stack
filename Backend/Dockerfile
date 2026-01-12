# Use Node.js 18
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port 4000 (matches your server.js)
EXPOSE 4000

# Start the server
CMD ["npm", "start"]