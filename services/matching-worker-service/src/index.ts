import amqplib from "amqplib";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const matchRequestQueue = "match-request-queue";

const prisma = new PrismaClient();

const thirtySecondsAgo = () => {
  const now = new Date();
  const validTimeWindow = 30000;
  return new Date(now.getTime() - validTimeWindow);
};

(async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
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

      // Matchmaking logic:
      // 1. Insert match request into database
      const matchRequestEntry = await prisma.matchRequest.create({
        data: {
          ...matchRequest,
          correlationId,
          replyTo: msg.properties.replyTo,
        },
      });

      // 2. Query database for match request with the following conditions:
      //    2.a. Same complexity level
      //    2.b. Not cancelled
      //    2.c. Not expired (calculated via timestamp difference, now - createdAt < 30s)
      //    2.d. Not fulfilled
      //    2.d. Does not belong to the same user (user ID)
      const compatibleMatch = await prisma.matchRequest.findFirst({
        select: {
          id: true,
          userId: true,
          correlationId: true,
          replyTo: true,
        },
        where: {
          status: { equals: "pending" },
          complexity: { equals: matchRequest.complexity },
          createdAt: { gte: thirtySecondsAgo() },
          userId: { not: matchRequest.userId },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      // 3. If a match is found, return the pair of user IDs and complexity level to both callback queues (by correlation id)
      //    3.a. Update both requests to be fulfilled in the database
      if (compatibleMatch) {
        const matchId = randomUUID();
        const userId1 = matchRequest.userId;
        const userId2 = compatibleMatch.userId;
        const complexity = matchRequest.complexity;
        const match = { userId1, userId2, complexity, matchId };
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
            data: { id: matchId, userId1, userId2, complexity },
          }),
        ]);
      }
      // 4. If a match is not found, do nothing
    });
  } catch (err) {
    console.error(err);
  }
})();
