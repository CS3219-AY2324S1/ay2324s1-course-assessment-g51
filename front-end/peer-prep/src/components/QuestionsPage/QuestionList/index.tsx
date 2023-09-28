import React from "react";
import CustomList from "./CustomList/CustomList";

// import inline styles
import * as Styles from "./styles";
import { Button, Stack, Typography, Divider} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const QuestionList = () => {
    return (
        <div style={Styles.questionListContainerStyle}>
            <div id="questionListViewStyle" style={Styles.questionListViewStyle}>
                <Stack divider={<Divider orientation="horizontal" />} sx={{alignItems: "center"}}>
                    <Typography variant="h5" sx={Styles.headerStyle}>Questions</Typography>
                    <Button variant="outlined" sx={Styles.buttonStyle}>
                        <AddIcon></AddIcon>Add a Question
                    </Button>
                    <CustomList />
                </Stack>
            </div>
        </div>
    )
}

export default QuestionList;
