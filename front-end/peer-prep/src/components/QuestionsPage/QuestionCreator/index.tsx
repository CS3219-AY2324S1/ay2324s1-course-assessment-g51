import React from "react";

// import inline styles
import * as Styles from "./styles";
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from "@mui/material";

import { useSelector } from "react-redux";
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice"

const QuestionCreator = () => {
    const currentQuestionNum = useSelector(QuestionSlice.selectNumOfQuestion)
    return (
        <div style={Styles.questionCreatorContainerStyle}>
            <div style = {Styles.questionCreatorViewStyle}>
                <div style = {Styles.labelContainerStyle}>
                    <TextField label="id" id="questionId" value={currentQuestionNum + "."} sx={Styles.idTextFieldStyle} disabled={true}></TextField>
                    <TextField label="title" sx={Styles.labelStyle}></TextField>
                    <TextField label="complexity" sx={Styles.labelStyle}></TextField>
                    <TextField label="categories" sx={Styles.labelStyle}></TextField>
                    <TextField label="description" sx={Styles.descriptionStyle} multiline rows={3}></TextField>
                    <button style={Styles.buttonStyle}>
                        <SaveIcon sx={{color:"#F4C2C2"}}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuestionCreator;
