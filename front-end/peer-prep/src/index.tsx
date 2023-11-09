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
import DeletePage from "./components/DeletePage";
import MatchingServicePage from "./components/MatchingServicePopUp";

import axios from "axios";
import AdminPage from "./components/AdminPage";
import PracticePage from "./components/PracticePage";
import * as RoutesSlice from "./components/redux/reducers/Routes/RoutesSlice";

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
	const [user, loading, error] = useAuthState(auth);
	const uid = user?.uid;
	const isNewUser = useSelector(UserSlice.selectIsFirstTimeLogin);
	const dispatch = useDispatch();
	const environment = useSelector(RoutesSlice.selectEnvironment);
	let port = "";
	if (loading) {
		// the user object will be null if firebase is loading
		// handle loading next time
		return <></>;
	}
	if (environment === "localhost") {
		console.log("hello world")
		port = ":3100"
	}
	axios({
		method: "get",
		url: `https://` + environment + port + `/users/profile/${uid}`,
	}).catch((error) => {
		console.log(error);
		dispatch(UserSlice.setIsFirstTimeLogin(true));
	});
	if (isNewUser) {
		// If user has not entered user details, navigate to User page
		return <Navigate to="/user" replace />;
	} else {
		return <></>;
	}
};

const RootApp = () => {
	const environment: string = process.env.REACT_APP_ENVIRONMENT as string;
	console.log("environment is: " + environment)
	const dispatch = useDispatch();
	dispatch(RoutesSlice.updateEnvironment(environment))
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
									<RedirectUserRoute />
								</>
							}
						>
							<Route path="home" element={<QuestionsPage />} />
							<Route path="user" element={<UserPage />} />
							<Route path="/admin" element={<AdminPage />} />
							<Route path="practice" element={<PracticePage />} />
						</Route>
						{/* All non-protected routes are written here */}
						<Route path="/" element={<SignInPage />} />
						<Route path="/signin" element={<SignInPage />} />
						<Route path="*" element={<ErrorPage />} />
						<Route path="/goodbye" element={<GoodbyePage />} />
						<Route path="/verify" element={<VerificationPage />} />
						<Route path="/delete" element={<DeletePage />} />
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
