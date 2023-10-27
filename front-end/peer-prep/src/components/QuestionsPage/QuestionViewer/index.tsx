import { useEffect } from "react";
import * as Styles from "./styles";
import { Stack, Chip, Button, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice"
import { useNavigate } from "react-router-dom";

const QuestionViewer = () => {
    // for dispatching actions
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentQuestionId: string = useSelector(QuestionSlice.selectCurrentId)
    const currentTitle: string = useSelector(QuestionSlice.selectCurrentTitle)
    const currentComplexity: string = useSelector(QuestionSlice.selectCurrentComplexity)
    const currentCategories: string[] = useSelector(QuestionSlice.selectCurrentCategories)
    const currentDescription: string = useSelector(QuestionSlice.selectCurrentDescription)

    // for initializing default values for the question creator based on the first data entry
    // will run only once!
    useEffect(() => {
        dispatch(QuestionSlice.initializeQuestionCreator())
    }, [])

    const attemptQuestion = () => {
        navigate("/match")
    }

    return (
        <div style={Styles.questionViewerContainerStyle}>
            <div style={Styles.questionViewerViewStyle}>
                <Stack direction="column" justifyContent="space-evenly" spacing={2} width="90%">
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>ID: {currentQuestionId}</Box>
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>Title: {currentTitle}</Box>
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>Complexity: {currentComplexity}</Box>
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
                            <div>Categories:</div>
                            {currentCategories.map((category) =>
                                <Chip label={category} variant="outlined" sx={Styles.questionViewerInnerStyle}></Chip>
                            )}
                        </Stack>
                    </Box>
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>{currentDescription}</Box>
                    <Button variant="outlined" onClick={attemptQuestion}>Attempt Question</Button>
                </Stack>
            </div>
        </div>
    )
}

export default QuestionViewer;
