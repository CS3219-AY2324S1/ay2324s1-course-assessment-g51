import { Channel } from "amqplib";
import { Server, Socket } from "socket.io";

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
