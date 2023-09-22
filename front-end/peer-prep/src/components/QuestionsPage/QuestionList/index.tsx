import React from "react";

// import inline styles
import { questionListContainerStyle } from "./styles";
import {
    Tooltip,
    Button,
    List,
    Chip,
    IconButton,
    Stack,
    Typography,
    Divider,
    Card,
    CardContent,
    CardActions,
    Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const QuestionList = () => {
    return (
        <div style={questionListContainerStyle}>
            <Stack divider={<Divider orientation="horizontal" />}>
                <Typography variant="h5">Questions</Typography>
                <Button variant="outlined">
                    <AddIcon></AddIcon>Add a Question
                </Button>
                <List>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid>
                                    <Typography variant="body1">
                                        Question title
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Chip label="complexity"></Chip>
                                </Grid>
                                <Grid>
                                    <Chip label="category"></Chip>
                                </Grid>
                                <Grid>
                                <CardActions>
                            <Tooltip title="Edit">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </List>
            </Stack>
        </div>
    )
}

export default QuestionList;
