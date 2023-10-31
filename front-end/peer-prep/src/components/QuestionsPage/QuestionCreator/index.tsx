import { useEffect } from "react";

// import inline styles
import * as Styles from "./styles";
import SaveIcon from '@mui/icons-material/Save';
import { TextField, Chip, Autocomplete, Select, FormControl, InputLabel, MenuItem, SelectChangeEvent, Tooltip, Snackbar, Alert, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice"
import React from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const QuestionCreator = () => {
    // for dispatching actions
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const createQuestionMessage = "New question created!";
    const patchQuestionMessage = "Question updated!";
    const sameQuestionTitleMessage = "Question title already exists!"

    // selectors
    const currentQuestionId: string = useSelector(QuestionSlice.selectCurrentId)
    const currentTitle: string = useSelector(QuestionSlice.selectCurrentTitle)
    const currentComplexity: string = useSelector(QuestionSlice.selectCurrentComplexity)
    const currentCategories: string[] = useSelector(QuestionSlice.selectCurrentCategories)
    const currentDescription: string = useSelector(QuestionSlice.selectCurrentDescription)
    const numOfQuestions: number = useSelector(QuestionSlice.selectNumOfQuestions)
    const categoryBuffer: string = useSelector(QuestionSlice.selectCategoryBuffer)
    const isAddQuestionButtonToggled: boolean = useSelector(QuestionSlice.selectAddQuestionButtonStatus)

    const [isErrorSnackbarOpen, openErrorSnackbar] = React.useState(false)
    const [isSuccessSnackbarOpen, openSuccessSnackbar] = React.useState(false)
    const [snackbarMsg, giveSnackbarMsg] = React.useState("")
    var duplicateCategoryErrorText: string = ""
    var duplicateCategoryError: boolean = false

    // Adds new question 
    const postQuestionData = () => {
		axios
			.post(`https://api.peerprepgroup51sem1y2023.xyz/api/questions/`, {
                category: currentCategories,
                description: currentDescription,
                complexity: currentComplexity,
                title: currentTitle
			})
			.then((reponse) => {
                const id = reponse.data._id;
                dispatch(QuestionSlice.addNewQuestion(id));
                openSuccessSnackbar(true);
			})
			.catch((error) => {
                const code = error.response.status;
                if (code === 400) {
                    openErrorSnackbar(true);
                    giveSnackbarMsg(sameQuestionTitleMessage);
                }
			});
	};

    const handlePostQuestionData = () => {
        postQuestionData();
        giveSnackbarMsg(createQuestionMessage);
    }

    // Update current question
    const patchQuestionData = () => {
		axios
			.patch(
				`https://api.peerprepgroup51sem1y2023.xyz/api/questions/${currentQuestionId}`,
				{
                    category: currentCategories,
                    complexity: currentComplexity,
                    description: currentDescription,
                    title: currentTitle
				}
			)
			.then(() => {
                openSuccessSnackbar(true);
                dispatch(QuestionSlice.updateCurrentQuestion());
			})
			.catch((error) => {
			})
    };

    const handlePatchQuestionData = () => {
        patchQuestionData();
        giveSnackbarMsg(patchQuestionMessage);
    }

    // lifecycle methods here

    // for initializing default values for the question creator based on the first data entry
    // will run only once!
    useEffect(() => {
        axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/api/questions`,
		})
			.then((response) => {
                const data = response.data;
                dispatch(QuestionSlice.initializeQuestionCreator(data));
			})
			.catch(() => {
			});
    }, [])

    const attemptQuestion = () => {
        navigate("/match")
    }

    return (
        <div style={Styles.questionCreatorContainerStyle}>
            <div style={Styles.questionCreatorViewStyle}>
                <div style={Styles.labelContainerStyle}>
                    <TextField label="id" id="test" value={currentQuestionId + "."} sx={Styles.idTextFieldStyle} disabled={true}></TextField>

                    <TextField label="title"
                        sx={Styles.labelStyle}
                        value={currentTitle}
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentTitle(event.target.value))}>
                    </TextField>

                    <FormControl fullWidth sx={Styles.labelStyle}>
                        <InputLabel sx={Styles.labelStyle}>complexity</InputLabel>
                        <Select
                            style={{ color: "white" }}
                            value={currentComplexity}
                            label="complexity"
                            onChange={(event: SelectChangeEvent) => { dispatch(QuestionSlice.updateCurrentComplexity(event.target.value)) }}>
                            <MenuItem value={"easy"}>Easy</MenuItem>
                            <MenuItem value={"medium"}>Medium</MenuItem>
                            <MenuItem value={"hard"}>Hard</MenuItem>
                        </Select>
                    </FormControl>

                    <Autocomplete
                        multiple
                        size="small"
                        clearOnBlur
                        onBlur={() => dispatch(QuestionSlice.clearCategoryBuffer())}
                        freeSolo
                        disableClearable
                        value={currentCategories}
                        options={[]}
                        sx={Styles.labelStyle}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                option === "" ? "" :
                                    <Chip style={Styles.chipStyle} label={option} {...getTagProps({ index })} onDelete={() => {
                                        dispatch(QuestionSlice.deleteFromCurrentCategories(index))
                                    }} />
                            ))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="categories"
                                placeholder="Add a category"
                                error={duplicateCategoryError}
                                helperText={duplicateCategoryErrorText}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" && categoryBuffer !== "") {
                                        if (!currentCategories.includes(categoryBuffer)) {
                                            dispatch(QuestionSlice.updateCurrentCategories(categoryBuffer))
                                            dispatch(QuestionSlice.clearCategoryBuffer())
                                        }
                                        else { // TODO snackbar: duplicate category
                                            duplicateCategoryError = true
                                            duplicateCategoryErrorText = "Duplicate category not allowed."
                                        }
                                    }
                                }}
                                onChange={(event) => {
                                    dispatch(QuestionSlice.updateCategoryBuffer(event.target.value))

                                }}
                            />
                        )}
                    />

                    <TextField label="description" sx={Styles.descriptionStyle} value={currentDescription} multiline rows={3}
                        onChange={(event) => dispatch(QuestionSlice.updateCurrentDescription(event.target.value))}>
                    </TextField>

                    <Stack direction="row" alignItems="flex-end" justifyContent="flex-end">
                        {(isAddQuestionButtonToggled) ? <></> : <Button variant="outlined" onClick={attemptQuestion}>Attempt Question</Button>}
                        <Tooltip title="Save">
                            <button style={Styles.buttonStyle} onClick={() => {
                                // form error checks and handling
                                if (currentTitle === "") {
                                    giveSnackbarMsg("Please provide a title.")
                                    openErrorSnackbar(true)
                                } else if (currentComplexity === "") {
                                    giveSnackbarMsg("Please choose a complexity.")
                                    openErrorSnackbar(true)
                                } else if (currentCategories.length < 1) {
                                    giveSnackbarMsg("Please provide at least 1 category.")
                                    openErrorSnackbar(true)
                                } else if (currentDescription === "") {
                                    giveSnackbarMsg("Please give a description.")
                                    openErrorSnackbar(true)
                                } else if (parseInt(currentQuestionId) <= numOfQuestions) { // TODO investigate for cause of list ordering bug
                                    dispatch(QuestionSlice.updateCurrentQuestion())
                                    giveSnackbarMsg("Question details updated.")
                                    openSuccessSnackbar(true)
                                } else {
                                    isAddQuestionButtonToggled 
                                        ? handlePostQuestionData()
                                        : handlePatchQuestionData();
                                }
                            }}>
                                <SaveIcon sx={{ color: "#F4C2C2", cursor: "pointer" }} />
                            </button>
                        </Tooltip>
                    </Stack>

                    <Snackbar
                        open={isErrorSnackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => openErrorSnackbar(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Alert severity="error">{snackbarMsg}</Alert>
                    </Snackbar>

                    <Snackbar
                        open={isSuccessSnackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => openSuccessSnackbar(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Alert severity="success">{snackbarMsg}</Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}

export default QuestionCreator;
