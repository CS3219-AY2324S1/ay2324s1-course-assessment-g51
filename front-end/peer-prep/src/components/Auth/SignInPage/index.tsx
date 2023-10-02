import { Button, InputAdornment, Switch, TextField } from "@mui/material"
import * as Styles from "./styles"
import { useState } from "react"
import  MailOutlineIcon from "@mui/icons-material/MailOutline"
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Image from "../../../images/PeerPrep.jpg"
import { useSignInWithEmailAndPassword,useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { Navigate } from "react-router-dom";

interface ChildProps {
    secondPassword: string;
    updateSecondPassword: React.Dispatch<React.SetStateAction<string>>;
    isPasswordHidden: boolean;
}

const SignInPage = () => {
    return (
        <div id="SignInPage" style={Styles.signInPageStyle}>
            <EmailAndPasswordContainer/>
            <PeerPrepImage/>
        </div>
    )
}

const EmailAndPasswordContainer = () => {
    const [isButtonToggled,toggleButton] = useState(false);
    const [isMouseHovered,setIsHovered] = useState(false);
    const [email,updateEmail] = useState("");
    const [password,updatePassword] = useState("");
    const [secondPassword,updateSecondPassword] = useState("");;
    // for signing in the user
    const [signInWithEmailAndPassword, isUserSignedIn, signInLoading, signInError] =
		useSignInWithEmailAndPassword(auth);
    const [
        createUserWithEmailAndPassword,
        isUserCreated,
        createUserLoading,
        createUserError,
        ] = useCreateUserWithEmailAndPassword(auth);
    const [isPasswordHidden,toggleEye] = useState(true)
    let errorText;
    let additionalToggleButtonStyle = {};
    let toggleButtonBorderStyle = {};
    let toggleButtonText = "Sign In";
    let confirmPassword;
    let visibilityIcon = <VisibilityOffIcon/>;
    if (signInError) {
        errorText = <ErrorText/>
    }
    if (createUserError) {
        errorText = <CreateUserErrorText/>
        console.log(createUserError.message)
    }
    if (signInLoading || createUserLoading) {
        // loadingStatus = <LinearDeterminate />;
    }
    if (isUserSignedIn || isUserCreated) {
        return <Navigate to="/home" replace={true} />;
    }
    if (isButtonToggled) {
        additionalToggleButtonStyle = Styles.signOutToggleStyle
        toggleButtonText = "Sign Up"
        confirmPassword = <ConfirmPasswordTextField 
            secondPassword={secondPassword} 
            updateSecondPassword={updateSecondPassword}
            isPasswordHidden={isPasswordHidden}
        />
    }
    if (isMouseHovered) {
        toggleButtonBorderStyle = Styles.toggleBorderStyle
    }
    if(!isPasswordHidden) {
        visibilityIcon = <VisibilityIcon/>
    }
    return (
        <div id="EmailAndPasswordContainer" style={Styles.emailAndPasswordContainerStyle}>
            <span style={Styles.firstHeaderStyle}>Welcome To PeerPrep!</span>
            <span style={Styles.secondHeaderStyle}>Please enter your details</span>
            <div style={Styles.switchStyle}>
                <div id="SignInToggle" style={{...Styles.signInToggleStyle,
                    ...additionalToggleButtonStyle,
                    ...toggleButtonBorderStyle}} 
                    onClick={() => toggleButton(!isButtonToggled)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <span style={Styles.toggleButtonTextStyle}>{toggleButtonText}</span>
                </div>
            </div>
            <TextField label="email"
                value={email}
                onChange={(e) => updateEmail(e.target.value)}  
                sx={Styles.textFieldStyle} 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MailOutlineIcon/>
                        </InputAdornment>
                    )
            }}>
            </TextField>
            <TextField label="password" value={password}
                type={isPasswordHidden ? "password": "text"}
                onChange={(e) => updatePassword(e.target.value)}
                hidden={true}
                sx={Styles.textFieldStyle} 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <KeyIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end" onClick={() => toggleEye(!isPasswordHidden)}>
                            {visibilityIcon}
                        </InputAdornment>
                    )
                }}
            >
            </TextField>
            {confirmPassword}
            <Button variant="contained" sx={Styles.continueButtonStyle} 
                onClick={() => {
                    if(isButtonToggled) {
                        if(password != secondPassword) {
                            errorText = <ErrorText/>
                        } else {
                            createUserWithEmailAndPassword(email,password)
                        }
                    } else {
                        signInWithEmailAndPassword(email,password)
                    }
                }}>Continue</Button>
            {errorText}
        </div>
    )
}

const ConfirmPasswordTextField:React.FC<ChildProps> = 
    ({secondPassword,updateSecondPassword,
        isPasswordHidden
    }) => {
    return (
        <>
            <TextField label="confirm password" value={secondPassword}
                type={isPasswordHidden ? "password": "text"}
                onChange={(e) => updateSecondPassword(e.target.value)} 
                sx={Styles.textFieldStyle} 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <KeyIcon/>
                        </InputAdornment>
                    )
                }}
            >
            </TextField>
        </>
    )
}

const ErrorText = () => {
    return (
        <>
            <span style={Styles.errorTextStyle}>You have entered either wrong email or password or both. Please try again</span>
        </>
    )
}

const CreateUserErrorText = () => {
    return (
        <>
            <span style={Styles.errorTextStyle}>Your passwords do not match or the email entered is not valid. Password must be more than 6 characters. Please try again</span>
        </>
    )
}

const PeerPrepImage = () => {
    return (
        <div style={Styles.peerPrepImageContainerStyle}>
            <img src={Image} alt="My Image" style={Styles.imageStyle}/>
        </div>
    )
}

export default SignInPage;