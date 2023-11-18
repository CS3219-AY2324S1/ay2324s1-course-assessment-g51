import { Channel } from "amqplib";
import { Server, Socket } from "socket.io";

import { randomUUID } from "crypto";
import { validateMatchRequestPromise } from "../utils/dataValidation";

const consumeTimeout = process.env.MATCH_REQUEST_TIMEOUT_MS || 30000;
const pseudoReturnQueue = "amq.rabbitmq.reply-to";
const matchRequestQueue = "match-request-queue";

const registerMatchRequestHandlers = (
  io: Server,
  socket: Socket,
  channel: Channel
) => {
  const createMatchRequest = async (data: any) => {
    console.log("creating match request with ", data);
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
          console.log(
            `match found, returning match object 
            ${message.content.toString()} to ${data.userId}`
          );
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
          console.log(`match not found for user ${data.userId}`);
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
