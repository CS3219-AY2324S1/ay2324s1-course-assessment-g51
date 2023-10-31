import { List, ListItem } from "@mui/material";
// import ListItem from "../ListItem/ListItem";
import { Tooltip, Chip, IconButton, Stack, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Style from "./styles"
import { useDispatch, useSelector } from "react-redux";
import * as QuestionSlice from "../../../redux/reducers/Question/QuestionSlice";
import * as UserSlice from "../../../redux/reducers/User/UserSlice";

import axios from 'axios';
import { useEffect } from "react";

interface questionObject {
    _id: string,
    title: string,
    category: string[],
    complexity: string,
    description: string
}

const CustomList = () => {
    const currentQuestionId: string = useSelector(QuestionSlice.selectCurrentId);

    // Deletes current question
    const deleteQuestion = () => {
        axios.delete(`https://api.peerprepgroup51sem1y2023.xyz/api/questions/${currentQuestionId}}`)
            .catch((error) => {
                console.log(error);
            });
    }

    //const [questions] = React.useState(localDatabase);
    const questions: questionObject[] = useSelector(QuestionSlice.selectQuestionsData)
    const currentId: string = useSelector(QuestionSlice.selectCurrentId)
    const isUserAnAdmin: boolean = useSelector(UserSlice.isUserAnAdmin)

    let additionalStackContainerStyle = {}
    const dispatch = useDispatch()
    console.log(questions);

    return (
        <List sx={Style.listStyle}>
            {questions.map((question: questionObject) => {
                if (question._id === currentId) {
                    additionalStackContainerStyle = {
                        border: "2px solid pink"
                    }
                } else {
                    additionalStackContainerStyle = {}
                }
                return (
                    <ListItem onClick={() => {
                        dispatch(QuestionSlice.toggleAddQuestionButton(false))
                        dispatch(QuestionSlice.updateCurrentId(question._id))
                    }}>
                        <Stack direction="column" sx={{ ...Style.stackContainerStyle, ...additionalStackContainerStyle }}>
                            <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center" sx={Style.questionHeadingsStyle}>
                                    {questions.indexOf(question) + 1}. {question.title}
                                    <Chip label={question.complexity} sx={Style.difficultyChipStyle}></Chip>
                                </Stack>
                                <Stack direction="row" justifyContent="flex-end">
                                    {isUserAnAdmin ?
                                        <Tooltip title="Delete">
                                            <IconButton style={Style.iconButtonStyle} onClick={(ev) => {
                                                ev.stopPropagation()
                                                deleteQuestion()
                                            }}><DeleteIcon />
                                            </IconButton>
                                        </Tooltip> : <></>
                                    }
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{ marginLeft: "5%" }}>
                                {question.category.map((category) => <Chip label={category} sx={Style.categoryChipStyle}></Chip>)}
                            </Stack>
                        </Stack>
                    </ListItem>
                )
            })}
        </List>
    );
}

export default CustomList;
