import * as Styles from './styles';

import { 
    IconButton, 
    Stack, 
    FormControlLabel, 
    FormGroup, 
    Checkbox, 
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
 } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

import { useState } from 'react';

const languages = ["Python", "Java", "Javascript", "C#", "Java"];
const progressMessage = [
    "Select preferred languages", 
    "Select preferred difficulty",
    "Select questions",
    "Select partner"
];

const LanguageSelection = () => {
    return (
        <Stack direction="row" spacing={40}>
            <FormGroup>
            {
                languages.map((language) => {
                    return (
                        <FormControlLabel control={<Checkbox sx={Styles.checkBoxStyle} />} 
                                        label={language}
                                        sx={Styles.formControlLabelStyle} />   
                    );
                })
            }
            </FormGroup>
        </Stack>
    )
};

const DifficultySelection = () => {
    return (
        <FormControl sx={Styles.difficultyStyle} fullWidth>
        <InputLabel sx={Styles.difficultyStyle}>Difficulty</InputLabel>
        <Select
            label="Difficulty"
            sx={Styles.difficultyStyle}
        >
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
            <MenuItem value={"any"}>Any difficulty</MenuItem>
        </Select>
        </FormControl>
    )
};



const MatchingServicePage = () => {
    const [progress, setProgress] = useState(1);
    
    const handleBackClick = () => {
        if (progress > 1) {
            setProgress(progress - 1);
        }
    };

    const handleForwardClick = () => {
        if (progress < 4) {
            setProgress(progress + 1);
        }
    };

    return(
        <div style={Styles.matchingServicePageContainerStyle}>
            <div style={Styles.progressBarContainerStyle}>
                    <div style={Styles.progressBarComponentStyle}>
                        <Typography sx={Styles.circleStyle}>1</Typography>
                        <Typography sx={Styles.textStyle}>{progressMessage[0]}</Typography>
                        <div style={Styles.horizontalLineStyle}></div>
                    </div>
                    <div style={Styles.progressBarComponentStyle}>
                        <Typography sx={Styles.circleStyle}>2</Typography>
                        <Typography sx={Styles.textStyle}>{progressMessage[1]}</Typography>
                        <div style={Styles.horizontalLineStyle}></div>
                    </div>
                    <div style={Styles.progressBarComponentStyle}>
                        <Typography sx={Styles.circleStyle}>3</Typography>
                        <Typography sx={Styles.textStyle}>{progressMessage[2]}</Typography>
                        <div style={Styles.horizontalLineStyle}></div>
                    </div>
                    <div style={Styles.progressBarComponentStyle}>
                        <Typography sx={Styles.circleStyle}>4</Typography>
                        <Typography sx={Styles.textStyle}>{progressMessage[3]}</Typography>
                    </div>
            </div>
            <div style={Styles.mainContainerStyle}>
                <IconButton onClick={handleBackClick}>
                    <ArrowBackIos sx={Styles.arrowStyle}/>
                </IconButton>
                    {progress === 1 ? <LanguageSelection/> : <DifficultySelection/>}
                <IconButton onClick={handleForwardClick}>
                    <ArrowForwardIos sx={Styles.arrowStyle}/>
                </IconButton>
            </div>
        </div>
    )
};

export default MatchingServicePage;
