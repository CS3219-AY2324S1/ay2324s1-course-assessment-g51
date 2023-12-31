import RequestPage from "./RequestPage";
import { auth } from "../Auth/Firebase";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import ManagePage from "./ManagePage";
import { IRoutes, getRoutes } from "../Routes";

const AdminPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	if (loading) {
		return <></>;
	}
	const currentUserUid = user?.uid;
	const routes: IRoutes = getRoutes();
	//check currentUser is admin or not
	const getIsAdmin = () => {
		axios({
			method: "get",
			url: routes.profile[1] + `${currentUserUid}`,
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
