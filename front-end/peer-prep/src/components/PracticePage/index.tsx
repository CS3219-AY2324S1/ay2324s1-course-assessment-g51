import Button from "@mui/material/Button";
import * as Styles from "./styles";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Snackbar,
	Alert,
} from "@mui/material";
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
import { IRoutes, getRoutes } from "../Routes";

const routes: IRoutes = getRoutes();
export const socket = io(routes.socketIO[1], {
	transports: ["websocket"],
	withCredentials: true,
});

const PracticePage = () => {
	const dispatch = useDispatch();

	const [
		isOpenLeaveRoomConfirmationDialog,
		setIsOpenLeaveRoomConfirmationDialog,
	] = useState(false);
	const [isOpenInformLeftRoomSnackbar, setIsOpenInformLeftRoomSnackbar] =
		useState(false);

	const openLeaveRoomConfirmation = () => {
		setIsOpenLeaveRoomConfirmationDialog(true);
	};

	const closeLeaveRoomConfirmation = () => {
		setIsOpenLeaveRoomConfirmationDialog(false);
	};

	const openInformLeftRoom = () => {
		setIsOpenInformLeftRoomSnackbar(true);
	};

	const closeInformLeftRoom = () => {
		setIsOpenInformLeftRoomSnackbar(false);
	};

	// Uncomment line 21 and comment out line 22 to test UI after matched
	//const partnerDetails = {"test":3};
	const partnerDetails = useSelector(MatchSlice.selectPartnerDetails);
	const isPartnerDetailsEmpty = partnerDetails.matchId === "";

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
			.catch(() => {});
	}, []);

	// Listens for event where the other user disconnects
	useEffect(() => {
		socket.on("userDisconnect", () => {
			openInformLeftRoom();
		});
	}, [socket]);

	const handleLeaveRoom = () => {
		closeLeaveRoomConfirmation();

		socket.emit("userDisconnect");
		//socket.disconnect();
		// Sets match to be false
		dispatch(
			MatchSlice.setPartnerDetails({
				userId1: "",
				userId2: "",
				complexity: "",
				matchId: "",
				language: "",
			})
		);
		dispatch(MatchSlice.setMatchResponse(""));
	};

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

			{isPartnerDetailsEmpty ? (
				<></>
			) : (
				<Button
					variant="contained"
					sx={Styles.leaveRoomButtonStyle}
					onClick={openLeaveRoomConfirmation}
				>
					Leave Room
				</Button>
			)}

			<Dialog
				open={isOpenLeaveRoomConfirmationDialog}
				onClose={closeLeaveRoomConfirmation}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Leave Room?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to leave the room?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeLeaveRoomConfirmation}>Back</Button>
					<Button
						onClick={handleLeaveRoom}
						autoFocus
						sx={Styles.leaveRoomConfirmationButtonStyle}
					>
						confirm
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={isOpenInformLeftRoomSnackbar}
				onClose={closeInformLeftRoom}
			>
				<Alert
					onClose={closeInformLeftRoom}
					severity="info"
					sx={{ width: "100%" }}
				>
					The other user has left the room
				</Alert>
			</Snackbar>

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
