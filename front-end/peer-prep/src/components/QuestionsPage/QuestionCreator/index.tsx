import React,{useState} from "react";

// import inline styles
import * as Styles from "./styles";
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice"

const QuestionCreator = () => {
    // for dispatching actions
    const dispatch = useDispatch()

    // selectors
    const currentQuestionId = useSelector(QuestionSlice.selectCurrentId)
    const currentTitle = useSelector(QuestionSlice.selectCurrentTitle)
    const currentComplexity = useSelector(QuestionSlice.selectCurrentComplexity)
    const currentCategories = useSelector(QuestionSlice.selectCurrentCategories)
    const currentDescription = useSelector(QuestionSlice.selectCurrentCategories)

    return (
        <div style={Styles.questionCreatorContainerStyle}>
            <div style = {Styles.questionCreatorViewStyle}>
                <div style = {Styles.labelContainerStyle}>
                    <TextField label="id" id="questionId" value={currentQuestionId + "."} sx={Styles.idTextFieldStyle} disabled={true}></TextField>
                    <TextField label="title" sx={Styles.labelStyle} value={currentTitle} 
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentTitle(event.target.value))}></TextField>
                    <TextField label="complexity" sx={Styles.labelStyle} value={currentComplexity} 
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentComplexity(event.target.value))}></TextField>
                    <TextField label="categories" sx={Styles.labelStyle} value={currentCategories} 
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentCategories(event.target.value))}></TextField>
                    <TextField label="description" sx={Styles.descriptionStyle} value={currentDescription} multiline rows={3}
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentDescription(event.target.value))}></TextField>
                    <button style={Styles.buttonStyle}>
                        <SaveIcon sx={{color:"#F4C2C2",cursor:"pointer"}}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuestionCreator;
