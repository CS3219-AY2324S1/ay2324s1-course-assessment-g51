import axios from "axios";
import * as Styles from "./styles";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

const ManagePage = () => {
	const [admins, setAdmins] = useState([]);
	const [requestors, setRequestors] = useState([]);

	//api call to get list of admins
	const getAllAdmin = () => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/users/admin/`,
		})
			.then((response) => {
				const data = response.data.data;
				console.log(data);
				setAdmins(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	//api call to get list of people requesting to be admin
	const getAllRequestors = () => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/users/request/`,
		})
			.then((response) => {
				const data = response.data.data;
				console.log(data);
				setRequestors(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getAllAdmin();
		getAllRequestors();
	}, []);

	return (
		<div style={Styles.ManagePageContainerStyle}>
			<div style={Styles.AdminContainerStyle}></div>
			<div style={Styles.RequestorContainerStyle}></div>
		</div>
	);
};

export default ManagePage;
