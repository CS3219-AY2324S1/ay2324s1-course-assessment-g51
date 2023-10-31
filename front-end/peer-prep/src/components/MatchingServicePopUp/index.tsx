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

import { ReactPropTypes, useEffect, useState } from 'react';
import React from 'react';

import { io } from "socket.io-client";

import { auth } from "../Auth/Firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as MatchSlice from "../redux/reducers/Match/MatchSlice"

const languages = ["python", "java", "javascript", "c#", "c++"];
const steps = [
    "Select preferred languages",
    "Select preferred difficulty",
    "Find partner"
];

const LanguageSelection = () => {
    const languagesChosen: string[] = useSelector(MatchSlice.selectLanguagesChosen);
    const dispatch = useDispatch();

    const handleLanguageChange = (language: string, isChecked: boolean) => {
        if (isChecked) {
            if (!languagesChosen.includes(language)) {
                const newLanguages = [...languagesChosen, language];
                dispatch(MatchSlice.setLanguages(newLanguages));
            }
        } else {
            const updatedLanguages = languagesChosen.filter((selectedLang: string) => selectedLang !== language);
            dispatch(MatchSlice.setLanguages(updatedLanguages));
        }
    };

    return (
        <Stack direction="row" spacing={40}>
            <FormGroup>
                {
                    languages.map((language) => {
                        return (
                            <FormControlLabel
                                key={language}
                                control={<Checkbox sx={Styles.checkBoxStyle} name={language} />}
                                label={language}
                                sx={Styles.formControlLabelStyle}
                                checked={languagesChosen.includes(language)}
                                onChange={(event, checked) => {
                                    handleLanguageChange(language, checked);
                                }}

                            />
                        );
                    })
                }
            </FormGroup>
        </Stack>
    )
};

const DifficultySelection = () => {
    const complexityChosen = useSelector(MatchSlice.selectComplexityChosen);
    const dispatch = useDispatch();
    return (
        <FormControl sx={{
            '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'pink', // Change to your desired border color
                    color: "pink",
                },
                borderColor: "pink"
            }
        }} fullWidth>
            <InputLabel sx={Styles.textStyle}>Difficulty</InputLabel>
            <Select
                label="Difficulty"
                sx={Styles.selectStyle}
                value={complexityChosen}
                onChange={(event) => {
                    const complexity = event.target.value
                    dispatch(MatchSlice.setComplexity(complexity))
                }}
            >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
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

const FindPartner = ({ isPartnerFound }: { isPartnerFound: boolean }) => {
    let firstText;
    let secondText;
    let navigate = useNavigate()
    if (isPartnerFound) {
        firstText = "Partner Found!";
        secondText = "Redirecting you to the collaboration page...";
    } else {
        firstText = "Searching for partner...";
        secondText = "Hang tight!"
        setTimeout(() => {
            navigate("/home")
        }, 4000)
    }
    return (
        <Stack direction="row" spacing={10}>
            <Stack>
                <Typography sx={Styles.textStyle}>{firstText}</Typography>
                <Typography sx={Styles.textStyle}>{secondText}</Typography>
            </Stack>
            <CircularProgress sx={Styles.circularProgressStyle} />
        </Stack>
    )
}

const socket = io("http://localhost:8000");

const MatchingServicePopUp = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [connect, setConnect] = useState(false);
    const [isPartnerFound, setPartnerFound] = useState(false)
    const languagesChosen: string[] = useSelector(MatchSlice.selectLanguagesChosen)
    const complexityChosen: string = useSelector(MatchSlice.selectComplexityChosen)
    console.log(connect);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to server")
        })
        socket.on("match-response:success", () => {
            console.log("success! partner found")
            setPartnerFound(true)
        });
        socket.on("match-response:failure", () => {
            console.log("failure");
        });
        socket.on("match-response:error", () => {
            console.log("error");
        });
        socket.on("error", (error) => {
            console.log(error);
        });
    }, [socket])


    const handleConnect = () => {
        setConnect(true);
        socket.emit("match-request:create",
            {
                "userId": auth.currentUser?.uid,
                "complexity": complexityChosen,
                "languages": languagesChosen
            });
        handleNext();
    };

    return (
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
                            : Styles.arrowStyle} />
                    </IconButton>

                    {activeStep === 0
                        ? <LanguageSelection />
                        : activeStep === 1
                            ? <DifficultySelection />
                            : <FindPartner isPartnerFound={isPartnerFound} />}

                    <Button onClick={activeStep === 1
                        ? handleConnect
                        : handleNext}>
                        {
                            activeStep !== steps.length - 1 && (
                                <ArrowForwardIos sx={Styles.arrowStyle} />
                            )
                        }
                    </Button>
                </div>


            )}
        </div>
    )
};

export default MatchingServicePopUp;
