import { IconButton } from "@mui/material";

import * as Styles from "./../styles"
import googleIconImage from '../../../../images/GoogleIcon.png'

import { useNavigate } from "react-router-dom";

import { auth } from "../../Firebase";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleSignInButton = () => {
    const navigateHome = useNavigate();
    const googleProvider = new GoogleAuthProvider();

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
            // Handle Errors here./
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

export default GoogleSignInButton;
