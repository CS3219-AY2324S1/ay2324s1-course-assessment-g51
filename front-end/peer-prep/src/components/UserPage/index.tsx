import { useEffect, useState } from "react";

import * as Styles from "./styles";
import { TextField, Avatar, Snackbar, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import * as UserSlice from "../redux/reducers/User/UserSlice";

import axios from "axios";

import { auth } from "../Auth/Firebase";

const UserPage = () => {
	// for dispatching actions
	const dispatch = useDispatch();

	// State for pop up box after editing user profile.
	const [isEditSuccess, setIsEditSuccess] = useState(false);
	const [hasEmptyDetails, setHasEmptyDetails] = useState(false);

	// Gets user details from firebase.
	const user = auth.currentUser;
	const authEmail = user?.providerData[0].email ?? "";
	console.log(user);
	//const authEmail = user?.email ?? ""
	const authUsername = user?.displayName ?? "";
	const authUid = user?.uid;

	const isNewUser = useSelector(UserSlice.selectIsFirstTimeLogin);
	const currentUsername: string = useSelector(
		UserSlice.selectCurrentUsername
	);
	const currentEmail: string = useSelector(UserSlice.selectCurrentEmail);
	const currentFirstName: string = useSelector(
		UserSlice.selectCurrentFirstName
	);
	const currentLastName: string = useSelector(
		UserSlice.selectCurrentLastName
	);
	const currentAge: number = useSelector(UserSlice.selectCurrentAge);

	// Messages for user.
	const EditUserSuccess = "User profile edited!";
	const PromptUserDetails = "Please enter user details.";
	const EmptyDetailsWarning = "User details cannot be empty!";

	// Gets user profile data.
	useEffect(() => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/users/${authUid}`,
		})
			.then((response) => {
				const data = response.data.data;
				dispatch(UserSlice.updateUserData(data));
			})
			.catch((error) => {
				console.log(error);
				dispatch(UserSlice.updateCurrentEmail(authEmail));
				dispatch(UserSlice.updateCurrentUsername(authUsername));
			});
	}, []);

	const handleClick = () => {
		setIsEditSuccess(true);
	};

	const handleClose = () => {
		setIsEditSuccess(false);
	};

	// First time creation for new user if user does not exist.
	const postUserData = () => {
		axios
			.post(`https://api.peerprepgroup51sem1y2023.xyz/users/`, {
				username: currentUsername,
				email: currentEmail,
				firstName: currentFirstName,
				lastName: currentLastName,
				age: currentAge,
				uid: authUid,
			})
			.then(() => {
				setHasEmptyDetails(false);
				dispatch(UserSlice.setIsFirstTimeLogin(false));
			})
			.catch((error) => {
				const code = error.request.status;
				if (code === 400) {
					setHasEmptyDetails(true);
				}
			});
	};

	// Updates user data after editing.
	const putUserData = () =>
		axios
			.put(`https://api.peerprepgroup51sem1y2023.xyz/users/${authUid}`, {
				username: currentUsername,
				email: currentEmail,
				firstName: currentFirstName,
				lastName: currentLastName,
				age: currentAge,
				uid: authUid,
			})
			.then(() => {
				setHasEmptyDetails(false);
			})
			.catch((error) => {
				const code = error.request.status;
				if (code === 400) {
					setHasEmptyDetails(true);
				}
			});

	return (
		<div style={Styles.UserPageContainerStyle}>
			<div style={Styles.MainContainerStyle}>
				<div style={Styles.DetailsContainerStyle}>
					<div style={Styles.AvatarContainerStyle}>
						<Avatar sx={Styles.AvatarStyle} src=""></Avatar>
					</div>
					<TextField
						label="Username"
						value={currentUsername}
						sx={Styles.detailStyle}
						onChange={(event) =>
							dispatch(
								UserSlice.updateCurrentUsername(
									event.target.value
								)
							)
						}
					></TextField>
					<TextField
						disabled
						label="Email"
						value={currentEmail}
						sx={Styles.detailStyle}
						onChange={(event) =>
							dispatch(
								UserSlice.updateCurrentEmail(event.target.value)
							)
						}
					></TextField>
					<TextField
						label="First Name"
						value={currentFirstName}
						sx={Styles.detailStyle}
						onChange={(event) =>
							dispatch(
								UserSlice.updateCurrentFirstName(
									event.target.value
								)
							)
						}
					></TextField>
					<TextField
						label="Last Name"
						value={currentLastName}
						sx={Styles.detailStyle}
						onChange={(event) =>
							dispatch(
								UserSlice.updateCurrentLastName(
									event.target.value
								)
							)
						}
					></TextField>
					<TextField
						label="Age"
						value={currentAge}
						sx={Styles.detailStyle}
						inputProps={{ maxLength: 3 }}
						onChange={(event) =>
							dispatch(
								UserSlice.updateCurrentAge(event.target.value)
							)
						}
					></TextField>
					<IconButton
						style={Styles.buttonStyle}
						onClick={() => {
							isNewUser ? postUserData() : putUserData();
							handleClick();
						}}
					>
						<SaveIcon
							sx={{ color: "#F4C2C2", cursor: "pointer" }}
						/>
					</IconButton>
					<Snackbar
						open={isEditSuccess}
						autoHideDuration={3000}
						onClose={handleClose}
						message={EditUserSuccess}
						action={
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						}
					/>
					<Snackbar open={isNewUser} message={PromptUserDetails} />
					<Snackbar
						open={hasEmptyDetails}
						message={EmptyDetailsWarning}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserPage;
