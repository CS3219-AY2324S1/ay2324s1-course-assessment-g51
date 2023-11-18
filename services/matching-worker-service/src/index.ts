import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

import { getQueueConnection } from "./rabbitmq/connection";
import { thirtySecondsAgo } from "./utils/timeFunctions";

const amqpUrl = process.env.AMQP_URL;
const matchRequestQueue = "match-request-queue";

const prisma = new PrismaClient();
const amqpConnectionPromise = getQueueConnection(amqpUrl);

(async () => {
  try {
    const amqpConnection = await amqpConnectionPromise;
    if (!amqpConnection) {
      throw Error();
    }
    const channel = await amqpConnection.createChannel();
    await channel.assertQueue(matchRequestQueue, { durable: false });
    await channel.prefetch(1);
    console.log(" [x] Awaiting RPC requests");
    channel.consume(matchRequestQueue, async (msg) => {
      if (!msg) {
        throw Error("received null message");
      }
      channel.ack(msg);
      const matchRequest = JSON.parse(msg.content.toString());
      const correlationId = msg.properties.correlationId;

      console.log(`received match request ${JSON.stringify(matchRequest)}`);

      const matchRequestEntry = await prisma.matchRequest.create({
        data: {
          ...matchRequest,
          correlationId,
          replyTo: msg.properties.replyTo,
        },
      });

      const compatibleMatch = await prisma.matchRequest.findFirst({
        select: {
          id: true,
          userId: true,
          correlationId: true,
          replyTo: true,
          languages: true,
        },
        where: {
          status: { equals: "pending" },
          complexity: { equals: matchRequest.complexity },
          createdAt: { gte: thirtySecondsAgo() },
          userId: { not: matchRequest.userId },
          languages: { hasSome: matchRequest.languages },
        },
        orderBy: { createdAt: "asc" },
      });

      if (!compatibleMatch) {
        return;
      }
      console.log(`found compatible match ${JSON.stringify(compatibleMatch)}`);

      const matchId = randomUUID();
      const userId1 = matchRequest.userId;
      const userId2 = compatibleMatch.userId;
      const complexity = matchRequest.complexity;
      const language = matchRequest.languages
        .filter((lang: string) => compatibleMatch.languages.includes(lang))
        .pop();
      const match = { userId1, userId2, complexity, matchId, language };

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(match)),
        { correlationId }
      );
      channel.sendToQueue(
        compatibleMatch.replyTo,
        Buffer.from(JSON.stringify(match)),
        { correlationId: compatibleMatch.correlationId }
      );
      await prisma.$transaction([
        prisma.matchRequest.update({
          where: { id: matchRequestEntry.id },
          data: { status: "fulfilled" },
        }),
        prisma.matchRequest.update({
          where: { id: compatibleMatch.id },
          data: { status: "fulfilled" },
        }),
        prisma.match.create({
          data: { id: matchId, userId1, userId2, complexity, language },
        }),
      ]);
    });
  } catch (err) {
    console.error(err);
    console.log("exiting");
    process.exit(1);
  }
})();
