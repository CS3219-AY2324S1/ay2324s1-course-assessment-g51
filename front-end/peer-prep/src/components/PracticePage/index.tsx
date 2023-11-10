import Button from "@mui/material/Button";
import * as Styles from "./styles";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as PracticeSlice from "../redux/reducers/Practice/PracticeSlice";
import * as QuestionSlice from "../redux/reducers/Question/QuestionSlice";
import * as MatchSlice from "../redux/reducers/Match/MatchSlice";
import * as RoutesSlice from "../redux/reducers/Routes/RoutesSlice";

import MatchingServicePopUp from "../MatchingServicePopUp";
import QuestionView from "./QuestionView";
import CodeView from "./CodeView";
import ChatView from "./ChatView";
import { useEffect, useState } from "react";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import { IRoutes, getRoutes } from "../Routes";

const environment = process.env.REACT_APP_ENVIRONMENT
let port = ""
let newSocket: Socket;
if (environment == "localhost") {
	port = ":8576"
	newSocket = io("http://" + environment + port + "/", {
		transports: ["websocket"],
		withCredentials: true,
	});
} else {
	newSocket = io("https://" + environment + port + "/", {
		transports: ["websocket"],
		withCredentials: true,
	});
}

export const socket = newSocket;

const PracticePage = () => {
	const dispatch = useDispatch();
	const partnerDetails = useSelector(MatchSlice.selectPartnerDetails);
	const environment = useSelector(RoutesSlice.selectEnvironment);
	const routes: IRoutes = getRoutes();
	// Displays first question if user refreshes the browser
	useEffect(() => {
		axios({
			method: "get",
			url: routes.questions,
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
			.catch(() => { });
	}, []);

	let practicePageStyle;
	if (Object.keys(partnerDetails).length === 0) {
		practicePageStyle = Styles.practicePageContainerStyle;
	} else {
		practicePageStyle = Styles.practicePageMatchedContainerStyle;
	}

	return (
		<div>
			<div id="PracticePage" style={practicePageStyle}>
				<QuestionView />
				<CodeView />
				{Object.keys(partnerDetails).length === 0 ? (
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
