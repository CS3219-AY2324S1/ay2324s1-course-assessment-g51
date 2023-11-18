import { useEffect, useState } from "react";
import * as Styles from "./styles";
import { socket } from "../index";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import * as MatchSlice from "../../redux/reducers/Match/MatchSlice";
import MaterialUISwitch from "./icon";
import SelectSmall from "./dropdown";
import * as PracticeSlice from "../../redux/reducers/Practice/PracticeSlice";

interface IPartnerDetails {
	userId1: string;
	userId2: string;
	complexity: string;
	matchId: string;
	language: string;
}

interface IMessageData {
	message: string;
	roomId: string;
	socketId: string;
	isMine: boolean;
}

const CodeView = () => {
	const [code, setCode] = useState("");
	const [theme, setTheme] = useState("");
	const partnerDetails: IPartnerDetails = useSelector(
		MatchSlice.selectPartnerDetails
	);
	const language: string = useSelector(PracticeSlice.selectLanguageState);

	const roomId = partnerDetails.matchId;

	useEffect(() => {
		// Listen for code changes from other clients and update the editor
		socket.on("code-change", (data: IMessageData) => {
			//console.log(data.message);
			setCode(data.message);
		});
	}, [socket]);

	const handleCodeChange = (newCode: any, event: any) => {
		setCode(newCode);
		// Send the new code to the server
		socket.emit("code-change", {
			message: newCode,
			roomId: roomId,
			socketId: socket.id,
			isMine: true,
		});
	};

	const handleToggleTheme = () => {
		if (theme == "vs-dark") {
			setTheme("");
		} else {
			setTheme("vs-dark");
		}
	};

	return (
		<div style={Styles.CodeViewContainerStyle}>
			<div style={Styles.topBarContainerStyle}>
				<div>
					<SelectSmall />
				</div>
				<div style={Styles.iconContainerStyle}>
					<MaterialUISwitch onChange={handleToggleTheme} />
				</div>
			</div>

			<Editor
				height="93%"
				defaultValue=""
				language={language}
				value={code}
				onChange={handleCodeChange}
				theme={theme}
			/>
		</div>
	);
};

export default CodeView;
