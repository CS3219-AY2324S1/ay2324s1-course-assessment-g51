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
import axios from "axios";
import { io } from "socket.io-client";
import { IRoutes, getRoutes } from "../Routes";


const routes: IRoutes = getRoutes();
export const socket = io(routes.socketIO[1], {
	transports: ["websocket"],
	withCredentials: true,
});

const PracticePage = () => {
	const dispatch = useDispatch();
	const partnerDetails = useSelector(MatchSlice.selectPartnerDetails);
	const routes: IRoutes = getRoutes();
	const questionTitle = useSelector(QuestionSlice.selectCurrentTitle);

	// Displays first question if user refreshes the browser
	if (questionTitle === "") {
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
	}

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
