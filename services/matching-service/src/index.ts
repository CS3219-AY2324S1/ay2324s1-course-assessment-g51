import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import amqplib from "amqplib";
import { randomUUID } from "crypto";
import Joi from "joi";

const app = express();
const server = createServer(app);
const io = new Server(server);

const matchRequestSchema = Joi.object({
  userId: Joi.string().required(),
  complexity: Joi.string().required().valid("easy", "medium", "difficult"),
});
const matchRequestQueue = "match-request-queue";
const consumeTimeout = 10000;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("match-request:create", async (data) => {
    try {
      const amqpConnection = await amqplib.connect("amqp://localhost");
      const channel = await amqpConnection.createChannel();
      const matchRequest = await matchRequestSchema.validateAsync(data);
      const correlationId = randomUUID();

      let done = false;

      const { consumerTag } = await channel.consume(
        "amq.rabbitmq.reply-to",
        async (message) => {
          console.log("Received message:", message?.content.toString());
          if (message?.properties.correlationId === correlationId) {
            socket.emit("match-response:success", message.content.toString());
            socket.disconnect();
            await channel.cancel(message.fields.consumerTag);
            done = true;
          }
        },
        { noAck: true }
      );

      channel.sendToQueue(
        matchRequestQueue,
        Buffer.from(JSON.stringify(matchRequest)),
        { correlationId, replyTo: "amq.rabbitmq.reply-to" }
      );

      setTimeout(async () => {
        if (!done) {
          socket.emit("match-response:failure");
          socket.disconnect();
          await channel.cancel(consumerTag);
        }
      }, consumeTimeout);
    } catch (err) {
      socket.emit("match-response:error", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.all("*", (_, res) => {
  return res.status(404).send();
});

server.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});

// Client -> API -> Queue -> Worker
// Detect state change in db
// API -> Client
