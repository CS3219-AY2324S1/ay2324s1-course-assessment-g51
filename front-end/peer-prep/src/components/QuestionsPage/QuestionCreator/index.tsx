import {useEffect} from "react";

// import inline styles
import * as Styles from "./styles";
import SaveIcon from '@mui/icons-material/Save';
import { TextField, Chip, Autocomplete } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice"

const QuestionCreator = () => {
    // for dispatching actions
    const dispatch = useDispatch()

    // selectors
    const currentQuestionId:string = useSelector(QuestionSlice.selectCurrentId)
    const currentTitle:string = useSelector(QuestionSlice.selectCurrentTitle)
    const currentComplexity:string = useSelector(QuestionSlice.selectCurrentComplexity)
    const currentCategories:string[] = useSelector(QuestionSlice.selectCurrentCategories)
    const currentDescription:string = useSelector(QuestionSlice.selectCurrentDescription)
    const numOfQuestions:number = useSelector(QuestionSlice.selectNumOfQuestions)
    const categoryBuffer:string = useSelector(QuestionSlice.selectCategoryBuffer)

    // lifecycle methods here

    // for initializing default values for the question creator based on the first data entry
    // will run only once!
    useEffect(() => {
        dispatch(QuestionSlice.initializeQuestionCreator())
    },[])

    return (
        <div style={Styles.questionCreatorContainerStyle}>
            <div style = {Styles.questionCreatorViewStyle}>
                <div style = {Styles.labelContainerStyle}>
                    <TextField label="id" id="test" value={currentQuestionId + "."} sx={Styles.idTextFieldStyle} disabled={true}></TextField>
                    <TextField label="title" sx={Styles.labelStyle} value={currentTitle} 
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentTitle(event.target.value))}></TextField>
                    <TextField label="complexity" sx={Styles.labelStyle} value={currentComplexity} 
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentComplexity(event.target.value))}></TextField>

                    <Autocomplete
                        multiple
                        clearOnBlur
                        freeSolo
                        disableClearable
                        value={currentCategories}
                        options={[]}
                        sx={Styles.labelStyle}
                        renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            option == "" ? "" :
                            <Chip style={Styles.chipStyle} label={option} {...getTagProps({ index })} onDelete={() => {
                                dispatch(QuestionSlice.deleteFromCurrentCategories(index))}} />
                        ))}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="categories"
                            placeholder="Add a category"
                            onKeyDown={(event) => {
                            if (event.key == "Enter" && categoryBuffer != "") {
                                if (!currentCategories.includes(categoryBuffer)) {
                                    dispatch(QuestionSlice.updateCurrentCategories(categoryBuffer))
                                    dispatch(QuestionSlice.clearCategoryBuffer())
                                } else { // show snackbar

                                }
                                console.log("keydown")
                            }
                        }}
                            onChange={(event) => {
                                dispatch(QuestionSlice.updateCategoryBuffer(event.target.value))
                                console.log("changed")
                            }}
                        />
                        )}
                    />

                    <TextField label="description" sx={Styles.descriptionStyle} value={currentDescription} multiline rows={3}
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentDescription(event.target.value))}></TextField>
                    <button style={Styles.buttonStyle} onClick={() => {
                        if(parseInt(currentQuestionId) <= numOfQuestions) {
                            dispatch(QuestionSlice.updateCurrentQuestion())
                        } else {
                            dispatch(QuestionSlice.addNewQuestion());
                            //dispatch(QuestionSlice.clearQuestionCreator())
                        }}}>
                        <SaveIcon sx={{color:"#F4C2C2",cursor:"pointer"}}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuestionCreator;
