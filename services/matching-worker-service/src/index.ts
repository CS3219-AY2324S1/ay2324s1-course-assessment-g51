import amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const matchRequestQueue = "match-request-queue";
    channel.assertQueue(matchRequestQueue, {
      durable: false,
    });

    channel.prefetch(1);
    console.log(" [x] Awaiting RPC requests");

    channel.consume(matchRequestQueue, (msg) => {
      const matchRequest = msg?.content.toString();
      console.log(matchRequest);
      const correlationId = msg?.properties.correlationId;

      channel.sendToQueue(
        msg!.properties.replyTo,
        Buffer.from(
          `hi ${correlationId}, your match request was ${matchRequest}`
        ),
        {
          correlationId,
        }
      );

      channel.ack(msg!);
    });
  });
});
