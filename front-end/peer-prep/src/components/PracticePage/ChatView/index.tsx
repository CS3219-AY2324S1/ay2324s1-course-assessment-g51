import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { List, TextField } from '@mui/material';

import * as Styles from './styles';

import ChatBubble from './ChatBubble/ChatBubble';

import axios from 'axios';

import * as QuestionSlice from '../../redux/reducers/Question/QuestionSlice';

const ChatView = () => {
    const dispatch = useDispatch();

    // Displays first question if user refreshes the browser
    useEffect(() => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/api/questions`,
		})
			.then((response) => {
                const data = response.data;
                const firstQuestion = data[0];
                dispatch(QuestionSlice.updateCurrentTitle(firstQuestion.title));
                dispatch(QuestionSlice.updateCurrentComplexity(firstQuestion.complexity));
                dispatch(QuestionSlice.updateAllCurrentCatogires(firstQuestion.category));
                dispatch(QuestionSlice.updateCurrentDescription(firstQuestion.description));   
			})
			.catch(() => {
			});
	}, []);

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
