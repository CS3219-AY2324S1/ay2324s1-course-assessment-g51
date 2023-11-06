import { useEffect, useState } from "react";
import * as Styles from "./styles";
import { socket } from "../index";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import * as MatchSlice from "../../redux/reducers/Match/MatchSlice";

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
	const partnerDetails: IPartnerDetails = useSelector(
		MatchSlice.selectPartnerDetails
	);
	const roomId = partnerDetails.matchId;

	useEffect(() => {
		// Listen for code changes from other clients and update the editor
		socket.on("code-change", (data: IMessageData) => {
			console.log(data.message);
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
	return (
		<div style={Styles.CodeViewContainerStyle}>
			<Editor
				defaultLanguage="javascript"
				defaultValue="//@Kang Quan all yours bro :)"
				language="javascript"
				value={code}
				onChange={handleCodeChange}
			/>
		</div>
	);
};

export default CodeView;
