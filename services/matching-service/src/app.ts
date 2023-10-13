import amqplib from "amqplib";
import express from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";

import registerDisconnectHandlers from "./handlers/disconnectHandler";
import registerMatchRequestHandlers from "./handlers/matchRequestHandler";

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

const onConnection = async (socket: Socket) => {
  console.log("a user connected");
  if (!amqpConnection) {
    throw Error();
  }
  const channel = await amqpConnection.createChannel();
  registerMatchRequestHandlers(io, socket, channel);
  registerDisconnectHandlers(io, socket, channel);
};

io.on("connection", onConnection);

// Catch all route handling
app.all("*", (_, res) => {
  return res.status(404).send();
});

export default server;
