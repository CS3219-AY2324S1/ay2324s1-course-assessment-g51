FROM node:18

WORKDIR /usr/src/app

COPY ./src/package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
