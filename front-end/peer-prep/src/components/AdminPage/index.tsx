import RequestPage from "./RequestPage";
import { auth } from "../Auth/Firebase";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

const AdminPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);

	if (loading) {
		return <></>;
	}

	const currentUserUid = user?.uid;

	//check currentUser is admin or not
	const getIsAdmin = () => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/users/admin/${currentUserUid}`,
		})
			.then((response) => {
				const data = response.data.data;
				console.log(data);
				setIsAdmin(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	getIsAdmin();
	//useEffect(getIsAdmin, []);

	if (isAdmin) {
		return <></>;
	} else {
		if (currentUserUid) {
			return <RequestPage uid={currentUserUid} />;
		} else {
			return <></>;
		}
	}
};

export default AdminPage;
