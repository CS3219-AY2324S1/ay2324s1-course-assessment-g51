import axios from "axios";
import * as Styles from "./styles";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const ManagePage = (props: any) => {
	const [admins, setAdmins] = useState([]);
	const [requestors, setRequestors] = useState([]);
	const [reload, setReload] = useState(false);
	const [isSuperAdmin, setIsSuperAdmin] = useState(false);

	//api call to get list of admins
	const getAllAdmin = () => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/users/admin/`,
		})
			.then((response) => {
				const data = response.data.data;
				setAdmins(data.filter((curr: any) => curr.uid !== props.uid));
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
				setRequestors(
					data.filter((curr: any) => curr.uid !== props.uid)
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	//api call to get list of admins
	const getisSuperAdmin = () => {
		axios({
			method: "get",
			//https://api.peerprepgroup51sem1y2023.xyz/users/superAdmin/${props.uid}
			url: `http://localhost:3100/users/superAdmin/${props.uid}`,
		})
			.then((response) => {
				const data = response.data.data;
				console.log(data);
				setIsSuperAdmin(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getAllAdmin();
		getAllRequestors();
		getisSuperAdmin();
	}, [reload]);

	const deleteButtonHandler = (currAdmin: any) => {
		axios
			.put(`https://api.peerprepgroup51sem1y2023.xyz/users/admin`, {
				toUpdate: [[currAdmin.uid, false]],
			})
			.then(() => {
				setReload((curr) => !curr);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const tickButtonHandler = (currAdmin: any) => {
		axios
			.put(`https://api.peerprepgroup51sem1y2023.xyz/users/request`, {
				toUpdate: [[currAdmin.uid, false]],
			})
			.then(() => {
				axios
					.put(
						`https://api.peerprepgroup51sem1y2023.xyz/users/admin`,
						{
							toUpdate: [[currAdmin.uid, true]],
						}
					)
					.then(() => {
						setReload((curr) => !curr);
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const crossButtonHandler = (currAdmin: any) => {
		console.log(currAdmin);
		axios
			.put(`https://api.peerprepgroup51sem1y2023.xyz/users/request`, {
				toUpdate: [[currAdmin.uid, false]],
			})
			.then(() => {
				setReload((curr) => !curr);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div style={Styles.ManagePageContainerStyle}>
			<div style={Styles.AdminMainStyle}>
				<div style={Styles.AdminTextStyle}>Admins</div>
				<div style={Styles.AdminListStyle}>
					<List sx={Styles.listStyle}>
						{admins.map((currAdmin: any) => {
							return (
								<>
									<ListItem
										key={currAdmin.uid}
										secondaryAction={
											isSuperAdmin ? (
												<IconButton
													edge="end"
													aria-label="delete"
													onClick={() =>
														deleteButtonHandler(
															currAdmin
														)
													}
												>
													<DeleteIcon
														sx={
															Styles.deleteIconStyle
														}
													/>
												</IconButton>
											) : (
												<></>
											)
										}
									>
										<Typography
											sx={Styles.textStyle}
											variant="subtitle1"
											component="div"
										>
											{currAdmin.username}
										</Typography>
									</ListItem>
									<Divider
										sx={Styles.DividerStyle}
										variant="middle"
									></Divider>
								</>
							);
						})}
					</List>
				</div>
			</div>

			<div style={Styles.RequestorMainStyle}>
				<div style={Styles.RequestorTextStyle}>
					Accept/Reject requests
				</div>
				<div style={Styles.RequestorListStyle}>
					<List sx={Styles.listStyle}>
						{requestors.map((currRequestors: any) => {
							return (
								<>
									<ListItem
										key={currRequestors.uid}
										secondaryAction={
											<IconButton
												style={{ cursor: "default" }}
												edge="end"
											>
												<DoneIcon
													sx={Styles.tickIconStyle}
													onClick={() =>
														tickButtonHandler(
															currRequestors
														)
													}
												/>
												<div
													style={Styles.emptySpace}
												></div>
												<ClearIcon
													sx={Styles.clearIconStyle}
													onClick={() =>
														crossButtonHandler(
															currRequestors
														)
													}
												/>
											</IconButton>
										}
									>
										<Typography
											sx={Styles.textStyle}
											variant="subtitle1"
											component="div"
										>
											{currRequestors.username}
										</Typography>
									</ListItem>
									<Divider
										sx={Styles.DividerStyle}
										variant="middle"
									></Divider>
								</>
							);
						})}
					</List>
				</div>
			</div>
		</div>
	);
};

export default ManagePage;
