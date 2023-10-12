import amqplib from "amqplib";

(async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const matchRequestQueue = "match-request-queue";
    await channel.assertQueue(matchRequestQueue, { durable: false });
    await channel.prefetch(1);
    console.log(" [x] Awaiting RPC requests");
    channel.consume(matchRequestQueue, (msg) => {
      if (!msg) {
        throw Error("received null message");
      }
      const matchRequest = JSON.parse(msg.content.toString()).value;
      console.log(matchRequest);
      const correlationId = msg.properties.correlationId;

      // Matchmaking logic:
      // 1. Insert match request into database
      // 2. Query database for match request with the following conditions:
      //    2.a. Same complexity level
      //    2.b. Not cancelled
      //    2.c. Not expired (calculated via timestamp difference, now - createdAt < 30s)
      //    2.d. Not fulfilled
      //    2.d. Does not belong to the same user (user ID)
      // 3. If a match is found, return the pair of user IDs and complexity level to both callback queues (by correlation id)
      //    3.a. Update both requests to be fulfilled in the database
      // 4. If a match is not found, do nothing

      const match = {
        userId1: matchRequest.userId,
        userId2: "user2",
        complexity: matchRequest.complexity,
      };

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(match)),
        { correlationId }
      );

      channel.ack(msg!);
    });
  } catch (err) {
    console.error(err);
  }
})();
