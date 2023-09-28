import React from "react";
import {List, ListItem} from "@mui/material";
// import ListItem from "../ListItem/ListItem";
import { Tooltip, Chip, IconButton, Stack, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import localDatabase from "../../../redux/localDatabase.json";

const CustomList = () => {
    const [questions] = React.useState(localDatabase);

    return(
        <List sx={{
            width: '100%',
            maxWidth: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 500,
          }}>
            {questions.map((question) => (
                <ListItem>
                    <Stack direction="column" sx={{width: '100%'}} style={{border: '1px black solid'}}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row" alignItems="center">
                                {question.Id} {question.Title}
                                <Chip label={question.Complexity}></Chip>
                            </Stack>
                            <Stack direction="row" justifyContent="flex-end">
                                <Tooltip title="Edit">
                                    <IconButton><EditIcon /></IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton><DeleteIcon /></IconButton>
                                </Tooltip>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            {question.Categories.map((category) => <Chip label={category}></Chip>)}
                        </Stack>
                    </Stack>
                </ListItem>
            ))}
        </List>
    );
}

export default CustomList;