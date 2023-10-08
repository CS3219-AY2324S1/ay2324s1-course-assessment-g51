import { Button, Divider, InputAdornment, Switch, TextField, Stack, IconButton } from "@mui/material"
import googleIconImage from '../../../images/GoogleIcon.png'
import facebookIconImage from '../../../images/FacebookIcon.png'
import githubIconImage from '../../../images/GithubIcon.png'
import twitterIconImage from '../../../images/TwitterIcon.png'
import * as Styles from "./styles"
import { useEffect, useState } from "react"
import  MailOutlineIcon from "@mui/icons-material/MailOutline"
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Image from "../../../images/PeerPrep.jpg"
import { useSignInWithEmailAndPassword,useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

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

const googleProvider = new GoogleAuthProvider();

const GoogleSignInButton = () => {
    const navigateHome = useNavigate();

    const handleGoogleSignIn = () => signInWithPopup(auth, googleProvider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.x
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        navigateHome("/home")
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

    return (
        <IconButton onClick={() => { handleGoogleSignIn() }}>
            <img style={Styles.iconStyle} src={googleIconImage} alt="googleIcon"/>
        </IconButton>
    )
}



const EmailAndPasswordContainer = () => {
    const [isButtonToggled,toggleButton] = useState(false);
    const [isMouseHovered,setIsHovered] = useState(false);
    const [email,updateEmail] = useState("");
    const [password,updatePassword] = useState("");
    const [secondPassword,updateSecondPassword] = useState("");;
    const [signInWithEmailAndPassword, isUserSignedIn, signInLoading, signInError] =
		useSignInWithEmailAndPassword(auth);
    const [createUserWithEmailAndPassword, isUserCreated, createUserLoading,
        createUserError] = useCreateUserWithEmailAndPassword(auth);
    const [isPasswordHidden,toggleEye] = useState(true);
    const [errorText,setErrorText] = useState("");
    let additionalToggleButtonStyle = {};
    let additionalToggleTextStyle = {};
    let toggleButtonBorderStyle = {};
    let toggleButtonText = "Sign In";
    let toggleText = "Sign Up"
    let confirmPassword;
    let visibilityIcon = <VisibilityOffIcon/>;
    useEffect(() => {
        if (signInError) {
            setErrorText(signInErrorText);
        }
        if (createUserError) {
            setErrorText(createUserErrorText);
        }
    },[signInError,createUserError]);
    useEffect(() => {
        setErrorText("");
    },[isButtonToggled])
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
        confirmPassword = <ConfirmPasswordTextField 
            secondPassword={secondPassword} 
            updateSecondPassword={updateSecondPassword}
            isPasswordHidden={isPasswordHidden}
        />;
    }
    if (isMouseHovered) {
        toggleButtonBorderStyle = Styles.toggleBorderStyle
    }
    if(!isPasswordHidden) {
        visibilityIcon = <VisibilityIcon/>
    }
    return (
        <div id="EmailAndPasswordContainer" style={Styles.emailAndPasswordContainerStyle}
            onKeyDown={(event) => {
                if (event.code === "Enter") {
                    if(isButtonToggled) {
                        if(password != secondPassword) {
                            setErrorText(createUserErrorText)
                        } else {
                            createUserWithEmailAndPassword(email,password)
                        }
                    } else {
                        signInWithEmailAndPassword(email,password)
                    }
                }
            }} 
        >
            <span style={Styles.firstHeaderStyle}>Welcome To PeerPrep!</span>
            <span style={Styles.secondHeaderStyle}>Please enter your details</span>
            <div style={Styles.switchStyle}>
                <div id="SignInToggle" style={{...Styles.signInToggleStyle,
                    ...additionalToggleButtonStyle,
                    ...toggleButtonBorderStyle}} 
                    onClick={() => {
                        toggleButton(!isButtonToggled);
                        setErrorText("");
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <span style={{...Styles.toggleButtonTextStyle}}>{toggleButtonText}</span>
                </div>
                <span style={{...Styles.toggleTextStyle,...additionalToggleTextStyle}} 
                    onClick={() => toggleButton(!isButtonToggled)}>
                        {toggleText}
                </span>
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
                            setErrorText(createUserErrorText)
                        } else {
                            createUserWithEmailAndPassword(email,password)
                        }
                    } else {
                        signInWithEmailAndPassword(email,password)
                    }
                }}
            >
                Continue
            </Button>
            <Divider variant="middle" sx={Styles.dividerStyle}>
                or continue with
            </Divider>
            <Stack direction="row" spacing={2}>
                <GoogleSignInButton/>
                <IconButton>
                    <img style={Styles.iconStyle} src={facebookIconImage} alt="facebookIcon"/>
                </IconButton>
                <IconButton>
                    <img style={Styles.iconStyle} src={githubIconImage} alt="githubIcon"/>
                </IconButton>
                <IconButton>
                    <img style={Styles.iconStyle} src={twitterIconImage} alt="twitterIcon"/>
                </IconButton>
            </Stack>
            <span style={Styles.errorTextStyle}>{errorText}</span>
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

const signInErrorText = "You have entered either wrong email or password or both. Please try again";
const createUserErrorText = "Your passwords do not match or the email entered is not valid. Password must be more than 6 characters. Please try again";

const PeerPrepImage = () => {
    return (
        <div style={Styles.peerPrepImageContainerStyle}>
            <img src={Image} alt="My Image" style={Styles.imageStyle}/>
        </div>
    )
}

export default SignInPage;
