FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# This starts the Vite dev server which matches your Compose setup
CMD ["npm", "run", "dev", "--", "--host"]