import { IconButton } from "@mui/material";

import * as Styles from "./../styles"
import googleIconImage from '../../../../images/GoogleIcon.png'

import { useNavigate } from "react-router-dom";

import { auth } from "../../Firebase";
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import axios from "axios";

const addUserToDatabase = (email: string | null, username:string | null) => {
    axios.post('http://api.peerprepgroup51sem1y2023.xyz/users/', {
        username: username,
        email: email
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

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
        const userEmail = user.email;
        const userName = user.displayName;
        console.log(user);
        
        const addInfo = getAdditionalUserInfo(result);
        console.log(addInfo)
        if (addInfo?.isNewUser) {
            addUserToDatabase(userEmail, userName);
        }

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
