FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the default Vite port
EXPOSE 5173

# Start Vite with --host so it is accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]