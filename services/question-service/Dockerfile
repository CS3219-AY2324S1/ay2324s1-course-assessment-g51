FROM node:18-buster as base
RUN apt-get install libcurl4
WORKDIR /usr/src/app
EXPOSE 8080

FROM base as test
COPY . .
RUN npm ci --include=dev
CMD ["npm", "run", "test"]

FROM base as dev
COPY . .
RUN npm ci --include=dev
CMD ["npm", "run", "start:dev"]
