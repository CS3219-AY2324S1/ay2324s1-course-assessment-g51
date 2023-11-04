import { List, TextField } from '@mui/material';

import * as Styles from './styles';

import ChatBubble from './ChatBubble/ChatBubble';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import * as MatchSlice from '../../redux/reducers/Match/MatchSlice';
import { useSelector, useDispatch } from 'react-redux';

// change to this when live https://api.peerprepgroup51sem1y2023.xyz/
const socket = io("https://collab.peerprepgroup51sem1y2023.xyz/");

type IMessage = {
    message: string;
    roomId: string;
};

interface IPartnerDetails {
    userId1: string,
    userId2: string,
    complexity: string
    matchId: string
    language: string
}

const ChatView = () => {
    const dispatch = useDispatch();
    const partnerDetails: IPartnerDetails = useSelector(MatchSlice.selectPartnerDetails);
    console.log(partnerDetails)
    const roomId = partnerDetails.matchId
    //const roomId = useSelector(MatchSlice.selectRoomId)
    console.log(roomId);
    // let roomId = "test";

    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to server");
        })

        socket.emit("joinRoom", roomId);

        socket.on("message", (data: IMessage) => {
            console.log("Received message:", data.message);

            // Update the messages state with the received message
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

    }, [socket]);

    const handleSendMessage = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && message != '') {
            console.log("enter pressed");

            // Add the new message to the messages state
            socket.emit("message", { "message": message, "roomId": roomId });
            setMessages((prevMessages) => [...prevMessages, message]);
            setMessage(''); // Clear the input field
        }
    };

    return (
        <div style={Styles.chatViewContainerStyle}>
            <List sx={Styles.listStyle}>
                {messages.map((message) => {
                    return (
                        <ChatBubble text={message} isMine={true} />
                    );
                })};
            </List>
            <TextField value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleSendMessage} sx={Styles.textFieldStyle}></TextField>
        </div>
    );
};

export default ChatView;
