import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";

import registerDisconnectHandlers from "./handlers/disconnectHandler";
import registerMatchRequestHandlers from "./handlers/matchRequestHandler";
import { getQueueConnection } from "./rabbitmq/connection";

const amqpUrl = process.env.AMQP_URL;
const amqpConnectionPromise = getQueueConnection(amqpUrl);

const app = express();
app.use(cors({ origin: "*" })); // Allow requests from any origin

// Health check endpoint 
app.get('/healthz', (_, res) => { 
  res.status(200).send('Server is healthy'); 
});

const server = createServer(app);
const io = new Server(server);

const onConnection = async (socket: Socket) => {
  console.log("a user connected");
  const amqpConnection = await amqpConnectionPromise;
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
