import { IconButton } from "@mui/material";

import * as Styles from "../styles"
import TwitterIconImage from '../../../../images/TwitterIcon.png'

import { useNavigate } from "react-router-dom";

import { auth } from "../../Firebase";

import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";

const TwitterSignInButton = () => {
    const navigateHome = useNavigate();
    const twitterProvider = new TwitterAuthProvider();
    
    const handleTwitterSignIn = () => signInWithPopup(auth, twitterProvider)
        .then((result) => {
            // This gives you a Twitter Access Token. You can use it to access the Twitter API.
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;

            // The signed-in user info.x
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            navigateHome("/home")
        }).catch((error) => {
            // Handle Errors here./
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            //const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        });

    return (
        <IconButton onClick={() => { handleTwitterSignIn() }}>
            <img style={Styles.iconStyle} src={TwitterIconImage} alt="twitterIcon"/>
        </IconButton>
    )
}

export default TwitterSignInButton;
