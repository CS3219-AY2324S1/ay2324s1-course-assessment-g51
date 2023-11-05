import { List, TextField } from '@mui/material';

import * as Styles from './styles';

import ChatBubble from './ChatBubble/ChatBubble';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import * as MatchSlice from '../../redux/reducers/Match/MatchSlice';
import { useSelector, useDispatch } from 'react-redux';

const socket = io("https://collab.peerprepgroup51sem1y2023.xyz/");

interface IMessageData {
    message: string,
    roomId: string,
    socketId: string,
    isMine: boolean
};

interface IPartnerDetails {
    userId1: string,
    userId2: string,
    complexity: string
    matchId: string
    language: string
}

const ChatView = () => {
    const partnerDetails: IPartnerDetails = useSelector(MatchSlice.selectPartnerDetails);
    const roomId = partnerDetails.matchId;

    const [messages, setMessages] = useState<IMessageData[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to server");
        })

        socket.emit("joinRoom", roomId);
        console.log(roomId)

        socket.on("message", (data:IMessageData) => {
            console.log("Server Received message:", data);

            // Checks if the message sent belongs to client using socket id
            data.isMine = data.socketId === socket.id;
            
            // Update the messages state with the received message
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, [socket]);

    const handleSendMessage = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && message != '') {
            // Add the new message to the messages state
            socket.emit("message", { "message": message, 
                                            "roomId": roomId,
                                            "socketId": socket.id,
                                            "isMine": true });
            setMessage(''); // Clear the input field
        }
    };

    return (
        <div style={Styles.chatViewContainerStyle}>
            <List sx={Styles.listStyle}>
                {messages.map((message) => {
                    return (
                        <ChatBubble text={message.message} isMine={message.isMine} />
                    );
                })}
            </List>
            <TextField value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleSendMessage} sx={Styles.textFieldStyle}></TextField>
        </div>
    );
};

export default ChatView;
