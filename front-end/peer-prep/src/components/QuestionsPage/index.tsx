import React from "react";

// import components
import QuestionCreator from "./QuestionCreator";
import QuestionList from "./QuestionList";

// import styles
import { questionPageContainerStyle } from "./styles";

const QuestionsPage = () => {
    return (
        <div style={questionPageContainerStyle}>
            <QuestionList/>
            <QuestionCreator/>
        </div>
    )
}

export default QuestionsPage;
