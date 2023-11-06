import express from "express";
import http from "http";
import { Server as socketIo } from "socket.io";
import cors from "cors";

interface IMessageData {
	message: string;
	roomId: string;
	socketId: string;
	isMine: boolean;
}

const app = express();
app.use(
	cors({
		origin: "*", // Allow requests from any origin
	})
);
const server = http.createServer(app);
const io = new socketIo(server, {});

const clientsByRoom = new Map();

io.on("connection", (socket) => {
	console.log("A user connected");

	let userRoom = null;

	// When a client connects, ask them to specify a room to join
	socket.on("joinRoom", (room) => {
		socket.join(room);
		userRoom = room;

		// Store the socket in the room's client list
		if (!clientsByRoom.has(room)) {
			clientsByRoom.set(room, new Set());
		}
		clientsByRoom.get(room).add(socket);

		console.log(`User joined room: ${room}`);
	});

	socket.on("message", (data: IMessageData) => {
		console.log("test");
		console.log("Received message:", data);
		try {
			// Broadcast the message to all connected clients
			const room = data.roomId;
			if (!room) {
				socket.emit(
					"error",
					"An error occurred while processing your request"
				);
			}
			// Emit the message to the specified room
			io.to(room).emit("message", data);
		} catch (error) {
			// Handle the error
			console.error("An error occurred in the event handler:", error);

			// You can emit an error event back to the client if needed
			socket.emit(
				"error",
				"An error occurred while processing your request"
			);
		}
	});

	socket.on("error", (error) => {
		console.log(error);
	});

	socket.on("disconnect", () => {
		console.log("A user disconnected");
		io.to(userRoom).emit("userDisconnect");
	});

	socket.on("code-change", (data: IMessageData) => {
		console.log("test");
		console.log("Received message:", data);
		try {
			// Broadcast the message to all connected clients
			const room = data.roomId;
			if (!room) {
				socket.emit(
					"error",
					"An error occurred while processing your request"
				);
			}
			// Emit the message to the specified room
			io.to(room).emit("code-change", data);
		} catch (error) {
			// Handle the error
			console.error("An error occurred in the event handler:", error);

			// You can emit an error event back to the client if needed
			socket.emit(
				"error",
				"An error occurred while processing your request"
			);
		}
	});
});

const port = process.env.PORT || 8576;

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
