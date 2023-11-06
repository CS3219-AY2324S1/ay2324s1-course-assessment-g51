import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Styles from "./styles";
import {
	TextField,
	Avatar,
	Snackbar,
	IconButton,
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Tooltip,
	Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import * as UserSlice from "../redux/reducers/User/UserSlice";

import axios from "axios";

import { auth } from "../Auth/Firebase";

const UserPage = () => {
	// for dispatching actions
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// State for pop up box after editing user profile.
	const [isEditSuccess, setIsEditSuccess] = useState(false);
	const [hasEmptyDetails, setHasEmptyDetails] = useState(false);
	const [duplicateUsername, setDuplicateUsername] = useState(false);

	// State for deletion conformation pop up.
	const [deletionConfirmation, setDeletionConfirmation] = useState(false);

	// Gets user details from firebase.
	const user = auth.currentUser;
	const authEmail = user?.providerData[0].email ?? "";

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
	const DuplicateUsernameMsg = "Username already exists";

	// Gets user profile data.
	useEffect(() => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/users/profile/${authUid}`,
		})
			.then((response) => {
				const data = response.data.data;
				dispatch(UserSlice.updateUserData(data));
			})
			.catch((error) => {
				dispatch(UserSlice.updateCurrentEmail(authEmail));
				dispatch(UserSlice.updateCurrentUsername(authUsername));
			});
	}, []);

	const openEditSuccessSnackbar = () => {
		setIsEditSuccess(true);
	};

	const closeEditSuccessSnackbar = () => {
		setIsEditSuccess(false);
	};

	const openDeleteConfirmation = () => {
		setDeletionConfirmation(true);
	};

	const closeDeleteConfirmation = () => {
		setDeletionConfirmation(false);
	};

	// First time creation for new user if user does not exist.
	const postUserData = () => {
		axios
			//.post(`http://localhost:3100/users/profile/`, {
			.post(`https://api.peerprepgroup51sem1y2023.xyz/users/profile/`, {
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
				const errMsg = error.response.data.message;
				if (code === 400) {
					setHasEmptyDetails(true);
				}
				if (code === 409 && errMsg === "Username already exists") {
					setDuplicateUsername(true);
				}
			});
	};

	// Updates user data after editing.
	const putUserData = () => {
		axios
			.put(
				`https://api.peerprepgroup51sem1y2023.xyz/users/profile/${authUid}`,
				//`http://localhost:3100/users/profile/${authUid}`,
				{
					username: currentUsername,
					email: currentEmail,
					firstName: currentFirstName,
					lastName: currentLastName,
					age: currentAge,
					uid: authUid,
				}
			)
			.then(() => {
				setHasEmptyDetails(false);
			})
			.catch((error) => {
				const code = error.request.status;
				const errMsg = error.response.data.message;

				if (code === 400) {
					setHasEmptyDetails(true);
				}
				if (code === 409 && errMsg === "Username already exists") {
					setDuplicateUsername(true);
				}
			});
	};

	const handleEditUserData = () => {
		setDuplicateUsername(false);
		isNewUser ? postUserData() : putUserData();
		openEditSuccessSnackbar();
	};

	// Deletes user data from postgres database.
	const deleteUserData = () => {
		axios
			.delete(
				`https://api.peerprepgroup51sem1y2023.xyz/users/profile/${authUid}`
			)
			.catch(() => { });
	};

	// Deletes user data from firebase.
	const deleteFirebaseUserData = () => {
		if (user) {
			user.delete();
		}
	};

	const handleDeleteUser = () => {
		closeDeleteConfirmation();
		navigate("/delete");
		deleteUserData();
		deleteFirebaseUserData();
	};

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
					<Tooltip title="Save changes">
						<IconButton
							style={Styles.buttonStyle}
							onClick={() => handleEditUserData()}
						>
							<SaveIcon
								sx={{ color: "#F4C2C2", cursor: "pointer" }}
							/>
						</IconButton>
					</Tooltip>
					<Stack direction="row" justifyContent="center">
						<Button
							sx={Styles.deleteAccountButton}
							onClick={openDeleteConfirmation}
						>
							delete account
						</Button>
					</Stack>
					<Snackbar
						open={isEditSuccess}
						autoHideDuration={3000}
						onClose={closeEditSuccessSnackbar}
						message={EditUserSuccess}
						action={
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={closeEditSuccessSnackbar}
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
					<Snackbar
						open={duplicateUsername}
						message={DuplicateUsernameMsg}
					/>
					<Dialog
						open={deletionConfirmation}
						onClose={closeDeleteConfirmation}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{"Delete account?"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Are you sure you want to delete your account?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={closeDeleteConfirmation}>
								Back
							</Button>
							<Button
								onClick={handleDeleteUser}
								autoFocus
								sx={Styles.deleteConfirmationButton}
							>
								Delete
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default UserPage;
