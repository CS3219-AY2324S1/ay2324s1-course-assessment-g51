FROM node:18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./peer-prep/package.json ./
COPY ./peer-prep/package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
