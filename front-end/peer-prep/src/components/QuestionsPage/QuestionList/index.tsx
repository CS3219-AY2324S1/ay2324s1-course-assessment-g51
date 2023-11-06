import CustomList from "./CustomList/CustomList";

// import Redux stuff
import { useDispatch, useSelector } from "react-redux";
import * as QuestionSlice from "../../redux/reducers/Question/QuestionSlice"
import * as UserSlice from "../../redux/reducers/User/UserSlice"
import { HelpOutline } from "@mui/icons-material";

// import inline styles
import * as Styles from "./styles";
import { Button, Stack, Typography, Divider, Box, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const QuestionList = () => {
    const isUserAnAdmin: boolean = useSelector(UserSlice.isUserAnAdmin)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const upgrade = () => {
        navigate("/admin")
    }

    return (
        <div style={Styles.questionListContainerStyle}>
            <div id="questionListViewStyle" style={Styles.questionListViewStyle}>
                <Stack divider={<Divider orientation="horizontal" />} sx={{ alignItems: "center" }}>
                    <Typography variant="h5" sx={Styles.headerStyle}>Questions</Typography>
                    {isUserAnAdmin ?
                        <Button variant="outlined" sx={Styles.buttonStyle}
                            onClick={() => {
                                dispatch(QuestionSlice.toggleAddQuestionButton(true));
                                dispatch(QuestionSlice.createNewQuestion())
                            }}>
                            <AddIcon></AddIcon>Add a Question
                        </Button> : <></>
                    }
                    <CustomList />
                    {!isUserAnAdmin ?
                        <Box alignSelf="end">
                            <Tooltip title="Contribute a question">
                                <Button onClick={upgrade}>
                                    <HelpOutline sx={{ color: "white" }} />
                                </Button>
                            </Tooltip>
                        </Box> : <></>
                    }
                </Stack>
            </div>
        </div>
    )
}

export default QuestionList;
