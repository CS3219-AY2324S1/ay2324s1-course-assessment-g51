import express from 'express';
import http from 'http';
import { SocketAddress } from 'net';
import { Server as socketIo } from 'socket.io';

interface IData {
    message: string,
    roomId: string
} 

const app = express();
const server = http.createServer(app);
const io = new socketIo(server, {
});

const clientsByRoom = new Map();

io.on('connection', (socket) => {
    console.log('A user connected');

    let userRoom = null;

    // When a client connects, ask them to specify a room to join
    socket.on('joinRoom', (room) => {
        socket.join(room);
        userRoom = room;

        // Store the socket in the room's client list
        if (!clientsByRoom.has(room)) {
        clientsByRoom.set(room, new Set());
        }
        clientsByRoom.get(room).add(socket);

        console.log(`User joined room: ${room}`);
    });

    // Define socket event handlers here
    socket.on('message', (data:IData) => {
        console.log('Received message:', data);
        // Broadcast the message to all connected clients
        const room = data.roomId; // Assuming the client sends the room information with the message

        // Emit the message to the specified room
        io.to(room).emit('message', data.message);
        socket.on('error', (error) => {
            console.log(error);
            io.to(room).emit('error', error);
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        io.to(userRoom).emit('userDisconnect')
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
