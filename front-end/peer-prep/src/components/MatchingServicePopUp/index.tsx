import * as Styles from "./styles";

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
} from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";

import { useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";

import { auth } from "../Auth/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as MatchSlice from "../redux/reducers/Match/MatchSlice";
import CustomCircularProgress from "./CustomCircularProgress";
import { getRoutes, IRoutes } from "../Routes";

const languages = ["python", "java", "javascript", "c#", "c++"];
const steps = [
	"Select preferred languages",
	"Select preferred difficulty",
	"Find partner",
];

interface IPartnerDetails {
	userId1: string;
	userId2: string;
	complexity: string;
	matchId: string;
	language: string;
}

const LanguageSelection = () => {
	const languagesChosen: string[] = useSelector(
		MatchSlice.selectLanguagesChosen
	);
	const dispatch = useDispatch();

	const handleLanguageChange = (language: string, isChecked: boolean) => {
		if (isChecked) {
			if (!languagesChosen.includes(language)) {
				const newLanguages = [...languagesChosen, language];
				dispatch(MatchSlice.setLanguages(newLanguages));
			}
		} else {
			const updatedLanguages = languagesChosen.filter(
				(selectedLang: string) => selectedLang !== language
			);
			dispatch(MatchSlice.setLanguages(updatedLanguages));
		}
	};

	return (
		<Stack direction="row" spacing={40}>
			<FormGroup>
				{languages.map((language) => {
					return (
						<FormControlLabel
							key={language}
							control={
								<Checkbox
									sx={Styles.checkBoxStyle}
									name={language}
								/>
							}
							label={language}
							sx={Styles.formControlLabelStyle}
							checked={languagesChosen.includes(language)}
							onChange={(event, checked) => {
								handleLanguageChange(language, checked);
							}}
						/>
					);
				})}
			</FormGroup>
		</Stack>
	);
};

const DifficultySelection = () => {
	const complexityChosen = useSelector(MatchSlice.selectComplexityChosen);
	const dispatch = useDispatch();
	return (
		<FormControl
			sx={{
				"&:hover": {
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: "pink", // Change to your desired border color
						color: "pink",
					},
					borderColor: "pink",
				},
			}}
			fullWidth
		>
			<InputLabel sx={Styles.textStyle}>Difficulty</InputLabel>
			<Select
				label="Difficulty"
				sx={Styles.selectStyle}
				value={complexityChosen}
				onChange={(event) => {
					const complexity = event.target.value;
					dispatch(MatchSlice.setComplexity(complexity));
				}}
			>
				<MenuItem value={"easy"}>Easy</MenuItem>
				<MenuItem value={"medium"}>Medium</MenuItem>
				<MenuItem value={"difficult"}>Difficult</MenuItem>
			</Select>
		</FormControl>
	);
};

const QuestionSelection = () => {
	return (
		<FormControl fullWidth>
			<InputLabel sx={Styles.textStyle}>Questions</InputLabel>
			<Select label="Questions" sx={Styles.selectStyle}>
				<MenuItem value={"test"}>Test</MenuItem>
			</Select>
		</FormControl>
	);
};

const FindPartner = () => {
	let firstText;
	let secondText;
	let navigate = useNavigate();
	const matchResponse = useSelector(MatchSlice.selectMatchResponse);
	if (matchResponse == "success") {
		firstText = "Partner Found!";
		secondText = "Redirecting you to the practice page...";
	} else if (matchResponse == "failure") {
		firstText = "No suitable match found...";
		secondText = "Please try again!";
	} else if (matchResponse == "error") {
		firstText = "Something went wrong...";
		secondText = "Please try again!";
	} else {
		firstText = "Searching for partner...";
		secondText = "Hang Tight!";
	}
	return (
		<Stack direction="row" spacing={10}>
			<Stack>
				<Typography sx={Styles.textStyle}>{firstText}</Typography>
				<Typography sx={Styles.textStyle}>{secondText}</Typography>
			</Stack>
			<CustomCircularProgress />
		</Stack>
	);
};

let socket = io("https://api.peerprepgroup51sem1y2023.xyz/", {
	transports: ["websocket"],
	withCredentials: true,
});

const MatchingServicePopUp = () => {
	const [activeStep, setActiveStep] = useState(0);
	const languagesChosen: string[] = useSelector(
		MatchSlice.selectLanguagesChosen
	);
	const complexityChosen: string = useSelector(
		MatchSlice.selectComplexityChosen
	);
	const dispatch = useDispatch();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	useEffect(() => {
		socket.on("connect", () => {
			console.log("connected to server");
		});
		socket.on("match-response:success", (data) => {
			console.log("success! partner found");
			dispatch(MatchSlice.setMatchResponse("success"));
			const partnerDetails: IPartnerDetails = JSON.parse(data);
			dispatch(MatchSlice.setPartnerDetails(partnerDetails));
			console.log(data);
		});
		socket.on("match-response:failure", () => {
			dispatch(MatchSlice.setMatchResponse("failure"));
			console.log("failure");
		});
		socket.on("match-response:error", () => {
			dispatch(MatchSlice.setMatchResponse("error"));
			console.log("error");
		});
		socket.on("error", (error) => {
			dispatch(MatchSlice.setMatchResponse("error"));
			console.log(error);
		});
	}, [socket]);

	const handleConnect = () => {
		socket = io("https://api.peerprepgroup51sem1y2023.xyz/", {
			transports: ["websocket"],
			withCredentials: true,
		});
		socket.emit("match-request:create", {
			userId: auth.currentUser?.uid,
			complexity: complexityChosen,
			languages: languagesChosen,
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
			<div style={Styles.mainContainerStyle}>
				<IconButton disabled={activeStep === 0} onClick={handleBack}>
					<ArrowBackIos
						sx={
							activeStep === 0
								? Styles.arrowStylesDisabled
								: Styles.arrowStyle
						}
					/>
				</IconButton>

				{activeStep === 0 ? (
					<LanguageSelection />
				) : activeStep === 1 ? (
					<DifficultySelection />
				) : (
					<FindPartner />
				)}

				{activeStep === steps.length - 1 ? (
					<></>
				) : (
					<Button
						onClick={activeStep === 1 ? handleConnect : handleNext}
					>
						<ArrowForwardIos sx={Styles.arrowStyle} />
					</Button>
				)}
			</div>
		</div>
	);
};

export default MatchingServicePopUp;
