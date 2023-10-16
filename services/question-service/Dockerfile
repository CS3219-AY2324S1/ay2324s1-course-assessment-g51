# ONLY FOR PRODUCTION

FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm install
COPY src/ src/
COPY tsconfig* .
RUN npm run build
RUN npm prune --omit=dev
CMD ["npm", "run", "start"]
