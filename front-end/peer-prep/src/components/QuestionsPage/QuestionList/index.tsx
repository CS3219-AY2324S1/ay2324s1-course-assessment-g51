import React from "react";
import CustomList from "./CustomList/CustomList";

// import inline styles
import { questionListContainerStyle } from "./styles";
import { Button, Stack, Typography, Divider} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const QuestionList = () => {
    return (
        <div style={questionListContainerStyle}>
            <Stack divider={<Divider orientation="horizontal" />}>
                <Typography variant="h5">Questions</Typography>
                <Button variant="outlined">
                    <AddIcon></AddIcon>Add a Question
                </Button>
                <CustomList />
            </Stack>
        </div>
    )
}

export default QuestionList;
