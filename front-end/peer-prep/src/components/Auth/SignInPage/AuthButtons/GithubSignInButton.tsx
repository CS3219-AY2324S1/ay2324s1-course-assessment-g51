import { IconButton } from "@mui/material";

import * as Styles from "./../styles"
import GithubIconImage from '../../../../images/GithubIcon.png'

import { useNavigate } from "react-router-dom";

import { auth } from "../../Firebase";

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

const GithubSignInButton = () => {
    const navigateHome = useNavigate();
    const githubProvider = new GithubAuthProvider();
    
    const handleGithubSignIn = () => signInWithPopup(auth, githubProvider)
        .then((result) => {
            // This gives you a Gtihub Access Token. You can use it to access the Github API.
            const credential = GithubAuthProvider.credentialFromResult(result);
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
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });

    return (
        <IconButton onClick={() => { handleGithubSignIn() }}>
            <img style={Styles.iconStyle} src={GithubIconImage} alt="githubIcon"/>
        </IconButton>
    )
}

export default GithubSignInButton;
