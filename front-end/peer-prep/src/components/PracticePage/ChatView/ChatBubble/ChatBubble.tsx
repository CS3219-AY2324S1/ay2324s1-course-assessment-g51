import * as Styles from './styles';
import { Typography } from '@mui/material';

interface ChatBubbleProps {
    text: string;
    isMine: boolean;
}

const ChatBubble = ({ text, isMine }:ChatBubbleProps) => {
    const myChatBubbleStyle = {
        backgroundColor: "#281E5D",
        width: "auto",
        borderRadius: "5px",
        wordWrap: "break-word",
        maxWidth: "300px",
        color:"white",
        marginRight: "5%",
        padding: "2%"
    };

    const otherChatBubbleStyle = {
        backgroundColor: "#1B2735",
        width: "auto",
        borderRadius: "5px",
        wordWrap: "break-word",
        maxWidth: "300px",
        color: "white",
        marginLeft: "5%",
        padding: "2%"
    };

    const MyChatBubble = () => {
        return (
            <div style={Styles.myBubbleContainerStyle}>
                <Typography sx={myChatBubbleStyle} mb={1}>
                    {text}
                </Typography>
            </div>
        )
    };

    const OtherChatBubble = () => {
        return (
            <Typography sx={otherChatBubbleStyle} mb={1}>
                {text}
            </Typography>
        )
    };
  
    return (
        <div>
            {isMine ? <MyChatBubble/> : <OtherChatBubble/>}
        </div>
    );
};

export default ChatBubble;
