import RequestPage from "./RequestPage";
import { auth } from "../Auth/Firebase";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import ManagePage from "./ManagePage";
import { useSelector } from "react-redux";
import * as RoutesSlice from "../redux/reducers/Routes/RoutesSlice";

const AdminPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const environment = useSelector(RoutesSlice.selectEnvironment);
	let port = ""
	if (environment == "localhost") {
		port = ":3100"
	}
	if (loading) {
		return <></>;
	}

	const currentUserUid = user?.uid;

	//check currentUser is admin or not
	const getIsAdmin = () => {
		axios({
			method: "get",
			url: `https://` + environment + port + `/users/admin/${currentUserUid}`,
		})
			.then((response) => {
				const data = response.data.data;
				setIsAdmin(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	getIsAdmin();
	//useEffect(getIsAdmin, []);

	if (isAdmin) {
		return <ManagePage uid={currentUserUid} />;
	} else {
		if (currentUserUid) {
			return <RequestPage uid={currentUserUid} />;
		} else {
			return <></>;
		}
	}
};

export default AdminPage;
