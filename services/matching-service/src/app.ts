import amqplib from "amqplib";
import { randomUUID } from "crypto";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { validateMatchRequestPromise } from "./utils/dataValidation";

const consumeTimeout = process.env.MATCH_REQUEST_TIMEOUT_MS || 30000;
const matchRequestQueue = "match-request-queue";
const pseudoReturnQueue = "amq.rabbitmq.reply-to";
const amqpUrl = "amqp://localhost";

const app = express();
const server = createServer(app);
const io = new Server(server);

let amqpConnection: amqplib.Connection | undefined;

const connectQueues = async (url: string) => {
  try {
    amqpConnection = await amqplib.connect(url);
  } catch (err) {
    console.error(err);
  }
};

connectQueues(amqpUrl);

io.on("connection", async (socket) => {
  console.log("a user connected");
  if (!amqpConnection) {
    throw Error();
  }

  const channel = await amqpConnection.createChannel();

  socket.on("disconnect", async () => {
    await channel.close();
    console.log("user disconnected");
  });

  socket.on("match-request:create", async (data) => {
    try {
      const matchRequest = await validateMatchRequestPromise(data);
      const correlationId = randomUUID();
      let isMatchFound = false;

      channel.consume(
        pseudoReturnQueue,
        async (message) => {
          if (!message) {
            return;
          }
          socket.emit("match-response:success", message.content.toString());
          socket.disconnect();
          isMatchFound = true;
        },
        { noAck: true }
      );

      channel.sendToQueue(
        matchRequestQueue,
        Buffer.from(JSON.stringify(matchRequest)),
        { correlationId, replyTo: pseudoReturnQueue }
      );

      setTimeout(async () => {
        if (!isMatchFound) {
          socket.emit("match-response:failure");
          socket.disconnect();
        }
      }, consumeTimeout);
    } catch (err) {
      socket.emit("match-response:error", err);
      socket.disconnect();
    }
  });
});

// Catch all route handling
app.all("*", (_, res) => {
  return res.status(404).send();
});

export default server;
