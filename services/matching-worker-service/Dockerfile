FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma/

RUN npm install

COPY . .

FROM build AS dev
CMD ["npm", "run", "start:migrate:dev"]

FROM build as prod
RUN npm run compile
CMD ["npm", "run", "start:migrate:prod"]
