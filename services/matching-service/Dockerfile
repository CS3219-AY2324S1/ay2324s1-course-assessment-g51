FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

FROM build AS dev
CMD ["npm", "run", "dev"]

FROM build as prod
RUN npm run compile
RUN npm prune --production
CMD ["npm", "run", "start"]
