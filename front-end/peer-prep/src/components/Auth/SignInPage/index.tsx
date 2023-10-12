import { useEffect, useState } from "react";

import {
	Button,
	Divider,
	InputAdornment,
	TextField,
	Stack,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";

import * as Styles from "./styles";
import Image from "../../../images/PeerPrep.jpg";

import {
	useSignInWithEmailAndPassword,
	useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { Navigate } from "react-router-dom";

import GoogleSignInButton from "./AuthButtons/GoogleSignInButton";
import FacebookSignInButton from "./AuthButtons/FacebookSignInButton";
import GithubSignInButton from "./AuthButtons/GithubSignInButton";
import TwitterSignInButton from "./AuthButtons/TwitterSignInButton";
import { sendEmailVerification } from "firebase/auth";

interface ChildProps {
	secondPassword: string;
	updateSecondPassword: React.Dispatch<React.SetStateAction<string>>;
	isPasswordHidden: boolean;
}

const SignInPage = () => {
	return (
		<div id="SignInPage" style={Styles.signInPageStyle}>
			<EmailAndPasswordContainer />
			<PeerPrepImage />
		</div>
	);
};

const EmailAndPasswordContainer = () => {
	const [isButtonToggled, toggleButton] = useState(false);
	const [isMouseHovered, setIsHovered] = useState(false);
	const [email, updateEmail] = useState("");
	const [password, updatePassword] = useState("");
	const [secondPassword, updateSecondPassword] = useState("");
	const [
		signInWithEmailAndPassword,
		isUserSignedIn,
		signInLoading,
		signInError,
	] = useSignInWithEmailAndPassword(auth);
	const [
		createUserWithEmailAndPassword,
		isUserCreated,
		createUserLoading,
		createUserError,
	] = useCreateUserWithEmailAndPassword(auth, {
		sendEmailVerification: true,
	});
	const [isPasswordHidden, toggleEye] = useState(true);
	const [errorText, setErrorText] = useState("");
	let additionalToggleButtonStyle = {};
	let additionalToggleTextStyle = {};
	let toggleButtonBorderStyle = {};
	let toggleButtonText = "Sign In";
	let toggleText = "Sign Up";
	let confirmPassword;
	let visibilityIcon = <VisibilityOffIcon />;
	useEffect(() => {
		if (signInError) {
			setErrorText(signInErrorText);
		}
		if (createUserError) {
			setErrorText(createUserErrorText);
		}
	}, [signInError, createUserError]);
	useEffect(() => {
		setErrorText("");
	}, [isButtonToggled]);
	if (signInLoading || createUserLoading) {
		// loadingStatus = <LinearDeterminate />;
	}
	if (isUserSignedIn || isUserCreated) {
		return <Navigate to="/home" replace={true} />;
	}
	if (isButtonToggled) {
		additionalToggleButtonStyle = Styles.toggleButtonStyle;
		additionalToggleTextStyle = Styles.additionalToggleTextStyle;
		toggleButtonText = "Sign Up";
		toggleText = "Sign In";
		confirmPassword = (
			<ConfirmPasswordTextField
				secondPassword={secondPassword}
				updateSecondPassword={updateSecondPassword}
				isPasswordHidden={isPasswordHidden}
			/>
		);
	}
	if (isMouseHovered) {
		toggleButtonBorderStyle = Styles.toggleBorderStyle;
	}
	if (!isPasswordHidden) {
		visibilityIcon = <VisibilityIcon />;
	}
	return (
		<div
			id="EmailAndPasswordContainer"
			style={Styles.emailAndPasswordContainerStyle}
			onKeyDown={(event) => {
				if (event.code === "Enter") {
					if (isButtonToggled) {
						if (password != secondPassword) {
							setErrorText(createUserErrorText);
						} else {
							createUserWithEmailAndPassword(email, password);
						}
					} else {
						signInWithEmailAndPassword(email, password);
					}
				}
			}}
		>
			<span style={Styles.firstHeaderStyle}>Welcome To PeerPrep!</span>
			<span style={Styles.secondHeaderStyle}>
				Please enter your details
			</span>
			<div style={Styles.switchStyle}>
				<div
					id="SignInToggle"
					style={{
						...Styles.signInToggleStyle,
						...additionalToggleButtonStyle,
						...toggleButtonBorderStyle,
					}}
					onClick={() => {
						toggleButton(!isButtonToggled);
						setErrorText("");
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<span style={{ ...Styles.toggleButtonTextStyle }}>
						{toggleButtonText}
					</span>
				</div>
				<span
					style={{
						...Styles.toggleTextStyle,
						...additionalToggleTextStyle,
					}}
					onClick={() => toggleButton(!isButtonToggled)}
				>
					{toggleText}
				</span>
			</div>
			<TextField
				label="email"
				value={email}
				onChange={(e) => updateEmail(e.target.value)}
				sx={Styles.textFieldStyle}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<MailOutlineIcon />
						</InputAdornment>
					),
				}}
			></TextField>
			<TextField
				label="password"
				value={password}
				type={isPasswordHidden ? "password" : "text"}
				onChange={(e) => updatePassword(e.target.value)}
				hidden={true}
				sx={Styles.textFieldStyle}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<KeyIcon />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment
							position="end"
							onClick={() => toggleEye(!isPasswordHidden)}
						>
							{visibilityIcon}
						</InputAdornment>
					),
				}}
			></TextField>
			{confirmPassword}
			<Button
				variant="contained"
				sx={Styles.continueButtonStyle}
				onClick={() => {
					if (isButtonToggled) {
						if (password != secondPassword) {
							setErrorText(createUserErrorText);
						} else {
							createUserWithEmailAndPassword(email, password);
						}
					} else {
						signInWithEmailAndPassword(email, password);
					}
				}}
			>
				Continue
			</Button>
			<Divider variant="middle" sx={Styles.dividerStyle}>
				or continue with
			</Divider>
			<Stack direction="row" spacing={2}>
				<GoogleSignInButton />
				<FacebookSignInButton />
				<GithubSignInButton />
				<TwitterSignInButton />
			</Stack>
			<span style={Styles.errorTextStyle}>{errorText}</span>
		</div>
	);
};

const ConfirmPasswordTextField: React.FC<ChildProps> = ({
	secondPassword,
	updateSecondPassword,
	isPasswordHidden,
}) => {
	return (
		<>
			<TextField
				label="confirm password"
				value={secondPassword}
				type={isPasswordHidden ? "password" : "text"}
				onChange={(e) => updateSecondPassword(e.target.value)}
				sx={Styles.textFieldStyle}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<KeyIcon />
						</InputAdornment>
					),
				}}
			></TextField>
		</>
	);
};

const signInErrorText =
	"You have entered either wrong email or password or both. Please try again";
const createUserErrorText =
	"Your passwords do not match or the email entered is not valid. Password must be more than 6 characters. Please try again";

const PeerPrepImage = () => {
	return (
		<div style={Styles.peerPrepImageContainerStyle}>
			<img src={Image} alt="My Image" style={Styles.imageStyle} />
		</div>
	);
};

export default SignInPage;
