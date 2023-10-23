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
    MenuItem,
    Stepper,
    Step,
    StepLabel,
    Button,
    CircularProgress
 } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

import { useState } from 'react';
import React from 'react';

const languages = ["Python", "Java", "Javascript", "C#", "Java"];
const steps = [
    "Select preferred languages", 
    "Select preferred difficulty",
    "Select questions",
    "Find partner"
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
        <FormControl fullWidth>
        <InputLabel sx={Styles.textStyle}>Difficulty</InputLabel>
        <Select
            label="Difficulty"
            sx={Styles.selectStyle}
        >
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
            <MenuItem value={"any"}>Any difficulty</MenuItem>
        </Select>
        </FormControl>
    )
};

const QuestionSelection = () => {
    return (
        <FormControl fullWidth>
        <InputLabel sx={Styles.textStyle}>Questions</InputLabel>
        <Select
            label="Questions"
            sx={Styles.selectStyle}
        >
            <MenuItem value={"test"}>Test</MenuItem>
        </Select>
        </FormControl>
    )
};

const FindPartner = () => {
    return (
        <Stack direction="row" spacing={10}>
            <Stack>
                <Typography sx={Styles.textStyle}>Searching for partner...</Typography>
                <Typography sx={Styles.textStyle}>Hang tight!</Typography>
            </Stack>
            <CircularProgress sx={Styles.circularProgressStyle}/>
        </Stack>
    )
}

const MatchingServicePage = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    return(
        <div style={Styles.matchingServicePageContainerStyle}>
            <Stepper sx={Styles.stepperStyle} activeStep={activeStep}>
                {steps.map((label, index) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                </React.Fragment>
            ) : (
                
                <div style={Styles.mainContainerStyle}>
                    <IconButton
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        >
                        <ArrowBackIos sx={activeStep === 0 
                                            ? Styles.arrowStylesDisabled
                                            : Styles.arrowStyle}/>
                    </IconButton>

                    {activeStep === 0 
                        ? <LanguageSelection/> 
                        : activeStep === 1
                        ? <DifficultySelection/>
                        : activeStep === 2
                        ? <QuestionSelection/>
                        : <FindPartner/>}

                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 
                            ? 'Finish' 
                            : <ArrowForwardIos sx={Styles.arrowStyle}/>}
                    </Button>
                </div>


            )}
        </div>
    )
};

export default MatchingServicePage;
