import { Button, InputAdornment, Switch, TextField } from "@mui/material"
import * as Styles from "./styles"
import { useState } from "react"
import  MailOutlineIcon from "@mui/icons-material/MailOutline"
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SignInPage = () => {
    return (
        <div id="SignInPage" style={Styles.signInPageStyle}>
            <EmailAndPasswordContainer/>
        </div>
    )
}

const EmailAndPasswordContainer = () => {
    const [toggleButtonStatus,toggleButton] = useState(false)
    const [isMouseHovered,setIsHovered] = useState(false)
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
            <TextField label="username" sx={Styles.textFieldStyle} InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MailOutlineIcon/>
                    </InputAdornment>
                )
            }}>
            </TextField>
            <TextField label="password" sx={Styles.textFieldStyle} InputProps={{
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
            }}>
            </TextField>
            <Button variant="contained" sx={Styles.continueButtonStyle}>Continue</Button>
        </div>
    )
}

export default SignInPage;