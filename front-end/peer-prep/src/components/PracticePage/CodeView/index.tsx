import { useEffect, useState } from "react";
import * as Styles from "./styles";
import { socket } from "../index";
import Editor from "@monaco-editor/react";

const CodeView = () => {
	const [code, setCode] = useState("");

	useEffect(() => {
		// Listen for code changes from other clients and update the editor
		socket.on("code-change", (newCode: string) => {
			setCode(newCode);
		});
	}, [socket]);

	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
		// Send the new code to the server
		socket.emit("code-change", newCode);
	};
	return (
		<div style={Styles.CodeViewContainerStyle}>
			<Editor
				defaultLanguage="javascript"
				defaultValue="//@Kang Quan all yours bro :)"
				language="javascript"
				value={code}
				onChange={() => handleCodeChange(code)}
			/>
		</div>
	);
};

export default CodeView;
