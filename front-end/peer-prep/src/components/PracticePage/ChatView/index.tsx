import { List, TextField } from '@mui/material';

import * as Styles from './styles';

import ChatBubble from './ChatBubble/ChatBubble';

const ChatView = () => {
    return (
        <div style={Styles.chatViewContainerStyle}>
                <List sx={Styles.listStyle}>
                    <ChatBubble text='hello how are youhello how are youhello how are youhello how are youhello how are you' isMine={true}/>
                    <ChatBubble text='How are you todayHow are youHow are you todayHow are youHow are you todayHow are youHow are you todayHow are you ' isMine={false}/>
                    <ChatBubble text='How are you todayHow are youHow are you todayHow are youHow are you todayHow are youHow are you todayHow are you ' isMine={false}/>
                    <ChatBubble text='hello how are youhello how are youhello how are youhello how are youhello how are you' isMine={true}/>
                    <ChatBubble text='How are you todayHow are youHow are you todayHow are youHow are you todayHow are youHow are you todayHow are you ' isMine={false}/>
                    <ChatBubble text='How are you todayHow are youHow are you todayHow are youHow are you todayHow are youHow are you todayHow are you ' isMine={false}/>
                    <ChatBubble text='hello how are youhello how are youhello how are youhello how are youhello how are you' isMine={true}/>
                    <ChatBubble text='How are you todayHow are youHow are you todayHow are youHow are you todayHow are youHow are you todayHow are you ' isMine={false}/>
                    <ChatBubble text='How are you todayHow are youHow are you todayHow are youHow are you todayHow are youHow are you todayHow are you ' isMine={false}/>
                    <ChatBubble text='hello how are youhello how are youhello how are youhello how are youhello how are you' isMine={true}/>
                    <ChatBubble text='How are you todayHow are youHow are you todayHow are youHow are you todayHow are youHow are you todayHow are you ' isMine={false}/>
                    <ChatBubble text='How are you todayHow are youHow are you todayHow are youHow are you todayHow are youHow are you todayHow are you ' isMine={false}/>
                </List>
                <TextField sx={Styles.textFieldStyle}></TextField>
        </div>
    );
};

export default ChatView;
