import { List, TextField } from '@mui/material';

import * as Styles from './styles';

import ChatBubble from './ChatBubble/ChatBubble';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// change to this when live https://api.peerprepgroup51sem1y2023.xyz/
const socket = io("http://localhost:8576");

type IMessage = {
    text: string;
    isMine: boolean;
};

const ChatView = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to server")
        })
    }, []);

    const handleSendMessage = (event:React.KeyboardEvent) => {
        if (event.key === 'Enter' && message != '') {
            console.log("enter pressed");
        
        // Add the new message to the messages state
        setMessages((prevMessages) => [...prevMessages, message]);
        setMessage(''); // Clear the input field
        }
    };

    return (
        <div style={Styles.chatViewContainerStyle}>
                <List sx={Styles.listStyle}>
                    {messages.map((message) => {
                        return (
                            <ChatBubble text={message} isMine={true}/>
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
