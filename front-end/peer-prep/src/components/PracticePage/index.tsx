import Button from "@mui/material/Button";
import * as Styles from "./styles";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as PracticeSlice from "../redux/reducers/Practice/PracticeSlice";
import * as QuestionSlice from "../redux/reducers/Question/QuestionSlice";
import * as MatchSlice from "../redux/reducers/Match/MatchSlice";

import MatchingServicePopUp from "../MatchingServicePopUp";
import QuestionView from "./QuestionView";
import CodeView from "./CodeView";
import ChatView from "./ChatView";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Navigate } from "react-router-dom";

export const socket = io("https://collab.peerprepgroup51sem1y2023.xyz/", {
	transports: ["websocket"],
	withCredentials: true,
});

const PracticePage = () => {
	const dispatch = useDispatch();

	// Uncomment line 21 and comment out line 22 to test UI after matched
	//const partnerDetails = {"test":3};
	const partnerDetails = useSelector(MatchSlice.selectPartnerDetails);
	const isPartnerDetailsEmpty = partnerDetails.matchId === "";

	// Displays first question if user refreshes the browser
	useEffect(() => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/api/questions`,
		})
			.then((response) => {
				const data = response.data;
				const firstQuestion = data[0];
				dispatch(QuestionSlice.updateCurrentTitle(firstQuestion.title));
				dispatch(
					QuestionSlice.updateCurrentComplexity(
						firstQuestion.complexity
					)
				);
				dispatch(
					QuestionSlice.updateAllCurrentCatogires(
						firstQuestion.category
					)
				);
				dispatch(
					QuestionSlice.updateCurrentDescription(
						firstQuestion.description
					)
				);
			})
			.catch(() => {});
	}, []);

	const leaveRoomConfimation = () => {

	}

	const handleLeaveRoom = () => {
		socket.disconnect();
		// Sets match to be false
		dispatch(MatchSlice.setPartnerDetails({
			userId1: "",
			userId2: "",
			complexity: "",
			matchId: "",
			language: ""}));
	}

	let practicePageStyle;
	if (isPartnerDetailsEmpty) {
		practicePageStyle = Styles.practicePageContainerStyle;
	} else {
		practicePageStyle = Styles.practicePageMatchedContainerStyle;
	}

	return (
		<div>
			<div id="PracticePage" style={practicePageStyle}>
				<QuestionView />
				<CodeView />
				{isPartnerDetailsEmpty ? (
					<Button
						sx={{ marginRight: "25%" }}
						variant="contained"
						onClick={() =>
							dispatch(
								PracticeSlice.toggleFindPartnerButton(true)
							)
						}
					>
						Find Partner
					</Button>
				) : (
					<ChatView />
				)}
			</div>
			{isPartnerDetailsEmpty 
				? 	<></>	
				:	<Button variant="contained" 
						sx={Styles.leaveRoomButtonStyle}
						onClick={handleLeaveRoom}>
							Leave Room
					</Button> 	
			}
			
			<BackdropMatchingService />
		</div>
	);
};

const BackdropMatchingService = () => {
	const dispatch = useDispatch();
	const isFindPartnerButtonPressed = useSelector(
		PracticeSlice.selectFindButtonState
	);
	const matchResponse = useSelector(MatchSlice.selectMatchResponse);
	if (matchResponse !== "") {
		setTimeout(() => {
			dispatch(PracticeSlice.toggleFindPartnerButton(false));
		}, 4000);
	}
	return (
		<Dialog
			onClose={() =>
				dispatch(PracticeSlice.toggleFindPartnerButton(false))
			}
			open={isFindPartnerButtonPressed}
			sx={Styles.dialogContainerStyle}
		>
			<MatchingServicePopUp />
		</Dialog>
	);
};

export default PracticePage;
