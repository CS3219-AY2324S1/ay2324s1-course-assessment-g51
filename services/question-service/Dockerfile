FROM node:18-buster AS base
RUN apt-get install libcurl4
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

FROM base AS test
CMD ["npm", "run", "test"]

FROM base AS dev
CMD ["npm", "run", "dev"]

FROM base AS prod 
RUN npm run build
RUN npm prune --production
CMD ["npm", "run", "start"]
