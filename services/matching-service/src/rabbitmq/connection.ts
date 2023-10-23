import amqplib from "amqplib";

let amqpConnection;

const getQueueConnection = async (url: string) => {
  try {
    amqpConnection = await amqplib.connect(url);
    return amqpConnection;
  } catch (err) {
    console.error(err);
    return;
  }
};

export { getQueueConnection };
