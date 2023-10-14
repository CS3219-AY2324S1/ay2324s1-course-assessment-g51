import { useEffect, useState } from "react";

import * as Styles from "./styles"
import { TextField, Avatar, Snackbar, Typography, IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from "react-redux";
import * as UserSlice from "../redux/reducers/User/UserSlice"

import axios from "axios";

import { auth } from "../Auth/Firebase";

const UserPage = () => {
    // for dispatching actions
    const dispatch = useDispatch()
    
    // State for pop up box after editing user profile.
    const [open, setOpen] = useState(false)

    // Gets user details from firebase.
    const user = auth.currentUser;
    const authEmail = user?.providerData[0].email ?? ""
    const authUsername = user?.displayName ?? ""
    const authUid = user?.uid
    
    const isNewUser = useSelector(UserSlice.selectIsFirstTimeLogin)
    const currentUsername:string = useSelector(UserSlice.selectCurrentUsername)
    const currentEmail:string = useSelector(UserSlice.selectCurrentEmail)
    const currentFirstName:string = useSelector(UserSlice.selectCurrentFirstName)
    const currentLastName:string = useSelector(UserSlice.selectCurrentLastName)
    const currentAge:number = useSelector(UserSlice.selectCurrentAge)

    // Gets user profile data.
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://api.peerprepgroup51sem1y2023.xyz/users/${authUid}`
            }).then((response) => {
                const data = response.data.data;
                dispatch(UserSlice.updateUserData(data))
            }).catch((error) => {
                console.log(error)
                dispatch(UserSlice.updateCurrentEmail(authEmail));
                dispatch(UserSlice.updateCurrentUsername(authUsername));
        })
    },[])

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Creates new user if does not exist.
    const postUserData = () => {
        axios.post(`http://api.peerprepgroup51sem1y2023.xyz/users/`, {
            username: authUsername,
            email: currentEmail,
            firstName: currentFirstName,
            lastName: currentLastName,
            age: currentAge,
            uid: authUid
        })
        .then(function (response) {
            console.log(response);
            dispatch(UserSlice.setIsFirstTimeLogin(false))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // Updates user data after editing.
    const putUserData = () => axios.put(`http://api.peerprepgroup51sem1y2023.xyz/users/${authUid}`,
    {
        "username": currentUsername,
        "email": currentEmail,
        "firstName": currentFirstName,
        "lastName": currentLastName,
        "age": currentAge,
        "uid": authUid
    })

    return (
        <div style={Styles.UserPageContainerStyle}>
            <div style={Styles.MainContainerStyle}>
                <div style={Styles.DetailsContainerStyle}>
                    <div style={Styles.AvatarAndUsernameContainerStyle}>
                        <Avatar sx={Styles.AvatarStyle} src=""></Avatar>
                        <Typography sx={Styles.userStyle}>{currentUsername}</Typography>
                    </div>
                    <TextField autoFocus label="Email" value={currentEmail} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentEmail(event.target.value))}></TextField>
                    <TextField label="First Name" value={currentFirstName} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentFirstName(event.target.value))}></TextField>
                    <TextField label="Last Name" value={currentLastName} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentLastName(event.target.value))}></TextField>
                    <TextField label="Age" value={currentAge} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentAge(event.target.value))}></TextField>
                    <IconButton style={Styles.buttonStyle} 
                                onClick={() => {isNewUser ? postUserData() : putUserData(); 
                                                handleClick();}}>
                        <SaveIcon sx={{color:"#F4C2C2",cursor:"pointer"}}/> 
                    </IconButton>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message="User profile edited!"
                        action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }/>
                    <Snackbar 
                        open={isNewUser}
                        message="Please enter user details." />
                </div>
            </div>
        </div>
    )
}

export default UserPage;
