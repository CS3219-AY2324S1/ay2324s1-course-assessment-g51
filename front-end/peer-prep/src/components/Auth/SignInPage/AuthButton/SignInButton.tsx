import { IconButton } from "@mui/material";

import * as Styles from "../styles";

import { useNavigate } from "react-router-dom";

import { auth } from "../../Firebase";
import {
	GoogleAuthProvider,
	GithubAuthProvider,
	TwitterAuthProvider,
	signInWithPopup,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import * as UserSlice from "../../../redux/reducers/User/UserSlice";
import axios from "axios";
import { IRoutes, getRoutes } from "../../../Routes";

interface SignInButtonProps {
	provider:
	| GoogleAuthProvider
	| GithubAuthProvider
	| TwitterAuthProvider;
	iconImage: string;
	iconImageAlt: string;
}

const SignInButton = ({
	provider,
	iconImage,
	iconImageAlt,
}: SignInButtonProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isNewUser = useSelector(UserSlice.selectIsFirstTimeLogin);
	const routes: IRoutes = getRoutes();
	provider.addScope("email");

	const handleSignIn = () =>
		signInWithPopup(auth, provider)
			.then((result) => {
				// The signed-in user info
				const user = result.user;
				const uid = user.uid;

				// Checks if user is new.
				axios({
					method: "get",
					url: routes.profile[0] + `${uid}`,
				}).catch((error) => {
					console.log(error);
					dispatch(UserSlice.setIsFirstTimeLogin(true));
				});

				if (isNewUser) {
					navigate("/user");
				} else {
					navigate("/home");
				}
			})
			.catch((error) => {
				console.log(error);
			});

	return (
		<IconButton
			onClick={() => {
				handleSignIn();
			}}
		>
			<img style={Styles.iconStyle} src={iconImage} alt={iconImageAlt} />
		</IconButton>
	);
};

export default SignInButton;
