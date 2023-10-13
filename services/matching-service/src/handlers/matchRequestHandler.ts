import { Socket, Server } from "socket.io";
import { Channel } from "amqplib";

import { validateMatchRequestPromise } from "../utils/dataValidation";
import { randomUUID } from "crypto";

const consumeTimeout = process.env.MATCH_REQUEST_TIMEOUT_MS || 30000;
const pseudoReturnQueue = "amq.rabbitmq.reply-to";
const matchRequestQueue = "match-request-queue";

const registerMatchRequestHandlers = (
  io: Server,
  socket: Socket,
  channel: Channel
) => {
  const createMatchRequest = async (data: any) => {
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
  };
  socket.on("match-request:create", createMatchRequest);
};

export default registerMatchRequestHandlers;
