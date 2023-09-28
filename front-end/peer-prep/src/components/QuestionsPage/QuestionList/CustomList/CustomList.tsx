import React from "react";
import {List, ListItem} from "@mui/material";
// import ListItem from "../ListItem/ListItem";
import { Tooltip, Chip, IconButton, Stack, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import localDatabase from "../../../redux/localDatabase.json";
import * as Style from "./styles"

const CustomList = () => {
    const [questions] = React.useState(localDatabase);

    return(
        <List sx={Style.listStyle}>
            {questions.map((question) => (
                <ListItem>
                    <Stack direction="column" sx={Style.stackContainerStyle}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" sx={Style.questionHeadingsStyle}>
                                {question.Id}. {question.Title}
                                <Chip label={question.Complexity} sx={Style.difficultyChipStyle}></Chip>
                            </Stack>
                            <Stack direction="row" justifyContent="flex-end">
                                <Tooltip title="Edit">
                                    <IconButton sx={Style.iconButtonStyle}><EditIcon /></IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton style={Style.iconButtonStyle}><DeleteIcon /></IconButton>
                                </Tooltip>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{marginLeft: "5%"}}>
                            {question.Categories.map((category) => <Chip label={category} sx={Style.categoryChipStyle}></Chip>)}
                        </Stack>
                    </Stack>
                </ListItem>
            ))}
        </List>
    );
}

export default CustomList;