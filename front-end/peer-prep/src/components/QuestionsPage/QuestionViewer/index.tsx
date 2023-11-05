import { useEffect } from "react";
import * as Styles from "./styles";
import { Stack, Chip, Button, Box, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice"
import { useNavigate } from "react-router-dom";

import axios from 'axios';

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
        navigate("/practice")
    }

    return (
        <div style={Styles.questionViewerContainerStyle}>
            <div style={Styles.questionViewerViewStyle}>
                <Stack direction="column" justifyContent="space-evenly" spacing={2} width="90%">
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>
                        <Typography variant="subtitle1">ID: {currentQuestionId}</Typography>
                    </Box>
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>
                        <Typography variant="subtitle1">Title: {currentTitle}</Typography>
                    </Box>
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>
                        <Typography variant="subtitle1">Complexity: {currentComplexity}</Typography>
                    </Box>
                    <Box component="span" sx={Styles.questionViewerInnerStyle}>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
                            <Typography variant="subtitle1">Categories:</Typography>
                            {currentCategories.map((category) =>
                                <Chip label={category} variant="outlined" sx={Styles.questionViewerInnerStyle}></Chip>
                            )}
                        </Stack>
                    </Box>
                    <Box component="span" sx={Styles.questionViewerDescriptionStyle}>
                        <Typography variant="subtitle1">Description: {currentDescription}</Typography>
                    </Box>
                    <Button variant="outlined" onClick={attemptQuestion}>Attempt Question</Button>
                </Stack>
            </div>
        </div>
    )
}

export default QuestionViewer;
