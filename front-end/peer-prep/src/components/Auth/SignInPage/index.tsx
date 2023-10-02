import { Button, InputAdornment, Switch, TextField } from "@mui/material"
import * as Styles from "./styles"
import { useState } from "react"
import  MailOutlineIcon from "@mui/icons-material/MailOutline"
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Image from "../../../images/PeerPrep.jpg"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
    return (
        <div id="SignInPage" style={Styles.signInPageStyle}>
            <EmailAndPasswordContainer/>
            <PeerPrepImage/>
        </div>
    )
}

const EmailAndPasswordContainer = () => {
    const [toggleButtonStatus,toggleButton] = useState(false)
    const [isMouseHovered,setIsHovered] = useState(false)
    const [email,updateEmail] = useState("")
    const [password,updatePassword] = useState("")
    // for signing in the user
    const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
    let errorText;
    if (error) {
        // errorTextComponent = <ErrorTextComponent />;
        errorText = <ErrorText/>
    }
    if (loading) {
        // loadingStatus = <LinearDeterminate />;
    }
    if (user) {
        return <Navigate to="/home" replace={true} />;
    }

    let additionalToggleButtonStyle = {};
    let toggleButtonBorderStyle = {};
    let toggleButtonText = "Sign In"
    if (toggleButtonStatus) {
        additionalToggleButtonStyle = Styles.signOutToggleStyle
        toggleButtonText = "Sign Up"
    }
    if (isMouseHovered) {
        toggleButtonBorderStyle = Styles.toggleBorderStyle
    }
    return (
        <div id="EmailAndPasswordContainer" style={Styles.emailAndPasswordContainerStyle}>
            <span style={Styles.firstHeaderStyle}>Welcome To PeerPrep!</span>
            <span style={Styles.secondHeaderStyle}>Please enter your details</span>
            <div style={Styles.switchStyle}>
                <div id="SignInToggle" style={{...Styles.signInToggleStyle,
                    ...additionalToggleButtonStyle,
                    ...toggleButtonBorderStyle}} 
                    onClick={() => toggleButton(!toggleButtonStatus)}
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
                onChange={(e) => updatePassword(e.target.value)} 
                sx={Styles.textFieldStyle} 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <KeyIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <VisibilityOffIcon/>
                        </InputAdornment>
                    )
                }}
            >
            </TextField>
            <Button variant="contained" sx={Styles.continueButtonStyle} onClick={() => signInWithEmailAndPassword(email,password)}>Continue</Button>
            {errorText}
        </div>
    )
}

const ErrorText = () => {
    return (
        <>
            <span style={Styles.errorTextStyle}>You have entered either wrong email or password or both. Please try again</span>
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