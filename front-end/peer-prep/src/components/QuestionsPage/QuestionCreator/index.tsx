import React from "react";

// import inline styles
import { questionCreatorContainerStyle, questionCreatorViewStyle, labelContainerStyle, labelStyle, descriptionStyle, buttonStyle } from "./styles";
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from "@mui/material";

const QuestionCreator = () => {
    return (
        <div style={questionCreatorContainerStyle}>
            <div style = {questionCreatorViewStyle}>
                <div style = {labelContainerStyle}>
                    <TextField sx={labelStyle}></TextField>
                    <TextField sx={labelStyle}></TextField>
                    <TextField sx={labelStyle}></TextField>
                    <TextField sx={labelStyle}></TextField>
                    <TextField sx={descriptionStyle}></TextField>
                    <button style={buttonStyle}>
                        <SaveIcon sx={{color:"#F4C2C2"}}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuestionCreator;
