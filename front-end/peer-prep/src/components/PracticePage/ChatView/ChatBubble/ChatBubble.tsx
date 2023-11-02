import * as Styles from './styles';
import { Typography } from '@mui/material';

interface ChatBubbleProps {
    text: string;
    isMine: boolean;
}

const ChatBubble = ({ text, isMine }:ChatBubbleProps) => {
    const myChatBubbleStyle = {
        backgroundColor: "#281E5D",
        width: `${text.length*8}px`,
        borderRadius: "5px",
        maxWidth: "300px",
        color:"white",
        marginRight: "5%",
        padding: "2%"
    };

    const otherChatBubbleStyle = {
        backgroundColor: "#1B2735",
        width: `${text.length*8}px`,
        maxWidth: "300px",
        borderRadius: "5px",
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
