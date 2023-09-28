import React from "react";

// import inline styles
import { questionCreatorContainerStyle, questionCreatorViewStyle, labelContainerStyle, labelStyle, descriptionStyle, buttonStyle } from "./styles";
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from "@mui/material";

import { useSelector } from "react-redux";
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice"

const QuestionCreator = () => {
    const currentQuestionNum = useSelector(QuestionSlice.selectNumOfQuestion)
    return (
        <div style={questionCreatorContainerStyle}>
            <div style = {questionCreatorViewStyle}>
                <div style = {labelContainerStyle}>
                    <TextField label="id" id="questionId" value={currentQuestionNum + "."} sx={labelStyle}></TextField>
                    <TextField label="title" sx={labelStyle}
                        InputProps={{
                            sx: {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: "isFocused" ? 'pink' : 'pink',
                            },
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                            color: "isFocused" ? 'pink' : 'pink',
                            },
                      }}
                    ></TextField>
                    <TextField label="complexity" sx={labelStyle}></TextField>
                    <TextField label="categories" sx={labelStyle}></TextField>
                    <TextField label="Description" sx={descriptionStyle}></TextField>
                    <button style={buttonStyle}>
                        <SaveIcon sx={{color:"#F4C2C2"}}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuestionCreator;
