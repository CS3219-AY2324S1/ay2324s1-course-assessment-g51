ARG DB_URL

FROM node:18-alpine AS build
ENV DATABASE_URL=DB_URL

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma/

COPY . .
RUN npm install
RUN npx prisma generate

FROM build AS dev
RUN npx prisma migrate dev
CMD ["npm", "run", "dev"]

FROM build as prod
RUN npm run compile
RUN npm prune --production
CMD ["npm", "run", "start"]
