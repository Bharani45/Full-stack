FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Your vite.config.js sets this to 5174
EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]