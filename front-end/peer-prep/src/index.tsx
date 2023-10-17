import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { auth } from "./components/Auth/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// import Redux components here
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./components/redux/store/store";
import * as UserSlice from "./components/redux/reducers/User/UserSlice";

// import React Routing components here
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	Navigate,
} from "react-router-dom";

// import app components here
import QuestionsPage from "./components/QuestionsPage";
import UserPage from "./components/UserPage";

// import styles
import { appStyle } from "./styles";
import ErrorPage from "./components/ErrorPage";
import SignInPage from "./components/Auth/SignInPage";
import Navbar from "./components/Navbar";
import GoodbyePage from "./components/Auth/GoodbyePage";
import VerificationPage from "./components/Auth/VerificationPage";

import axios from "axios";

const ProtectedRoute = () => {
	const [user, loading, error] = useAuthState(auth);
	const emailVerified = user?.emailVerified;
	const providerType = user?.providerData[0].providerId;

	if (loading) {
		// the user object will be null if firebase is loading
		// handle loading next time
		return <></>;
	}
	if (error) {
		return <Navigate to="*" />;
	}
	if (!user) {
		// User is not authenticated, navigate to SignIn page
		return <Navigate to="/signin" replace />;
	}
	if (providerType === "password" && !emailVerified) {
		console.log(emailVerified);
		console.log("here");
		// User is created by password but not verified, navigate to verification page
		return <Navigate to="/verify" replace />;
	}

	return <Outlet />;
};

const RedirectUserRoute = () => {
	const user = auth.currentUser;
	const uid = user?.uid;
	const isNewUser = useSelector(UserSlice.selectIsFirstTimeLogin);
	const dispatch = useDispatch();
	debugger;
	axios({
		method: "get",
		url: `http://api.peerprepgroup51sem1y2023.xyz/users/${uid}`,
	}).catch((error) => {
		console.log(error);
		console.log("test");
		dispatch(UserSlice.setIsFirstTimeLogin(true));
	});
	if (isNewUser) {
		debugger;
		// If user has not entered user details, navigate to User page
		return <Navigate to="/user" replace />;
	} else {
		return <></>;
	}
};

const RootApp = () => {
	return (
		<Provider store={store}>
			<div id="app" style={appStyle}>
				<BrowserRouter>
					<Routes>
						{/* All protected routes are written here */}
						<Route
							element={
								<>
									<Navbar />
									<ProtectedRoute />
								</>
							}
						>
							<Route path="home" element={<QuestionsPage />} />
							<Route path="user" element={<UserPage />} />
						</Route>
						{/* All non-protected routes are written here */}
						<Route path="/" element={<SignInPage />} />
						<Route path="/signin" element={<SignInPage />} />
						<Route path="*" element={<ErrorPage />} />
						<Route path="/goodbye" element={<GoodbyePage />} />
						<Route path="/verify" element={<VerificationPage />} />
					</Routes>
				</BrowserRouter>
			</div>
		</Provider>
	);
};
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<RootApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
