import * as Styles from "./styles"

import { Typography, Stack, TextField, Box, Divider, Avatar } from "@mui/material";
import { Style } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import * as UserSlice from "../redux/reducers/User/UserSlice"

const UserPage = () => {
    // for dispatching actions
    const dispatch = useDispatch()
    
    const currentUsername:string = useSelector(UserSlice.selectCurrentUsername)
    const currentEmail:string = useSelector(UserSlice.selectCurrentEmail)
    const currentPassword:string = useSelector(UserSlice.selectCurrentPassword)
    const currentFirstName:string = useSelector(UserSlice.selectCurrentFirstName)
    const currentLastName:string = useSelector(UserSlice.selectCurrentLastName)
    const currentAge:string = useSelector(UserSlice.selectCurrentAge)

    return (
        <div style={Styles.UserPageContainerStyle}>
            <div style={Styles.MainContainerStyle}>
                <div style={Styles.DetailsContainerStyle}>
                    <div style={Styles.AvatarAndUsernameContainerStyle}>
                        <Avatar sx={Styles.AvatarStyle}></Avatar>
                        <TextField size="small" value={currentUsername} sx={Styles.userStyle} 
                                    inputProps={{style: { textAlign: "center", fontSize:"25px" }}}
                                    onChange={(event) => dispatch(UserSlice.updateCurrentUsername(event.target.value))}></TextField>
                    </div>
                    <TextField autoFocus label="Email" value={currentEmail} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentEmail(event.target.value))}></TextField>
                    <TextField label="Password" value={currentPassword} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentPassword(event.target.value))}></TextField>
                    <TextField label="First Name" value={currentFirstName} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentFirstName(event.target.value))}></TextField>
                    <TextField label="Last Name" value={currentLastName} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentLastName(event.target.value))}></TextField>
                    <TextField label="Age" value={currentAge} sx={Styles.detailStyle}
                                onChange={(event) => dispatch(UserSlice.updateCurrentAge(event.target.value))}></TextField>
                </div>
            </div>
        </div>
    )
}

export default UserPage;
