import React from "react";

// import inline styles
import { questionCreatorContainerStyle, questionCreatorViewStyle, labelContainerStyle, labelStyle, descriptionStyle, buttonStyle } from "./styles";

const QuestionCreator = () => {
    return (
        <div style={questionCreatorContainerStyle}>
            <div style = {questionCreatorViewStyle}>
                <div style = {labelContainerStyle}>
                    <div style={labelStyle}>id</div>
                    <div style={labelStyle}>title</div>
                    <div style={labelStyle}>complexity</div>
                    <div style={labelStyle}>categories</div>
                    <div style={descriptionStyle}>description</div>
                    <button style={buttonStyle}>test</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionCreator;
