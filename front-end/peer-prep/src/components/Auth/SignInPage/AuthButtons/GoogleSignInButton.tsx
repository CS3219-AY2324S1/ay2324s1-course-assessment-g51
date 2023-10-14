import { IconButton } from "@mui/material";

import * as Styles from "./../styles"
import googleIconImage from '../../../../images/GoogleIcon.png'

import { useNavigate } from "react-router-dom";

import { auth } from "../../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import * as UserSlice from "../../../redux/reducers/User/UserSlice"

import axios from "axios";

const GoogleSignInButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isNewUser = useSelector(UserSlice.selectIsFirstTimeLogin);

    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope('email');

    const handleGoogleSignIn = () => signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            
            // The signed-in user info.x
            const user = result.user;
            const uid = user.uid;
            
            axios({
                method: 'get',
                url: `http://api.peerprepgroup51sem1y2023.xyz/users/${uid}`,
                }).then((response) => {
                    dispatch(UserSlice.setIsFirstTimeLogin(false))
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                }
            );

            if (isNewUser) {
                navigate("/user");
            } else {
                navigate("/home");
            }
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
