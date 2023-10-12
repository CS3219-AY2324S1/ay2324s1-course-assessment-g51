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

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("match-request:create", async (data) => {
    try {
      const matchRequest = matchRequestSchema.validate(data);
      const amqpConnection = await amqplib.connect("amqp://localhost");
      const channel = await amqpConnection.createChannel();
      // Anonymous, exclusive callback queue. 1 callback queue per client.
      const callbackQueue = await channel.assertQueue("", {
        exclusive: true,
      });
      const correlationId = randomUUID();
      const matchRequestQueue = "match-request-queue";
      channel.sendToQueue(
        matchRequestQueue,
        Buffer.from(JSON.stringify(matchRequest)),
        { correlationId, replyTo: callbackQueue.queue }
      );
      channel.consume(
        callbackQueue.queue,
        (msg) => {
          if (msg?.properties.correlationId === correlationId) {
            socket.emit("match-response:success", msg.content.toString());
          }
        },
        { noAck: true }
      );
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
