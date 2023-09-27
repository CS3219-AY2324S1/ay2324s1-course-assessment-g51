import { Tooltip, Chip, IconButton, Typography, Card, CardContent, CardActions, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

const ListItem = () => {
    return(
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
    );
}

export default ListItem;