import { IconButton } from "@mui/material";

import * as Styles from "./../styles"
import FacebookIconImage from '../../../../images/FacebookIcon.png'

import { useNavigate } from "react-router-dom";

import { auth } from "../../Firebase";

import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const FacebookSignInButton = () => {
    const navigateHome = useNavigate();
    const facebookProvider = new FacebookAuthProvider();

    const handleFacebookSignIn = () => signInWithPopup(auth, facebookProvider)
        .then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
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
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
        });

    return (
        <IconButton onClick={() => { handleFacebookSignIn() }}>
            <img style={Styles.iconStyle} src={FacebookIconImage} alt="facebookIcon"/>
        </IconButton>
    )
}

export default FacebookSignInButton;
