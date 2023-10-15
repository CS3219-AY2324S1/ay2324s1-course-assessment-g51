FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production
CMD ["npm", "run", "start"]
