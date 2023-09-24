import React from "react";

// import components
import QuestionCreator from "./QuestionCreator";
import QuestionList from "./QuestionList";

// import styles
import { questionPageContainerStyle } from "./styles";

const QuestionsPage = () => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    if (htmlElement && bodyElement) {
        // Apply the CSS styles
        htmlElement.style.padding = '0';
        htmlElement.style.margin = '0';
        bodyElement.style.padding = '0';
        bodyElement.style.margin = '0';
    }
    
    return (
        <div style={questionPageContainerStyle}>
            <QuestionList/>
            <QuestionCreator/>
        </div>
    )
}

export default QuestionsPage;
