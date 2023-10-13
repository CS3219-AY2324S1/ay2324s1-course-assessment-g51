import { Socket, Server } from "socket.io";
import { Channel } from "amqplib";

const registerDisconnectHandlers = (
  io: Server,
  socket: Socket,
  channel: Channel
) => {
  const disconnectAndCleanupRoutine = async () => {
    await channel.close();
    console.log("user disconnected");
  };
  socket.on("disconnect", disconnectAndCleanupRoutine);
};

export default registerDisconnectHandlers;
