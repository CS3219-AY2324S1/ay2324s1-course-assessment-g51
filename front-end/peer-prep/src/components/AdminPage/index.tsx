import { Button } from "@mui/material";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const AdminPage = () => {
	const navigate = useNavigate();

	//resent verification email once button is pressed
	//firebase will block on its own if it is spammed
	// const buttonHandler = async () => {
	// 	const currentUser = auth.currentUser;
	// 	try {
	// 		if (currentUser) {
	// 			await sendEmailVerification(currentUser).then(() => {
	// 				// Email verification sent!
	// 				// ...
	// 			});
	// 		}
	// 	} catch (e) {
	// 		//firebase will auto block request if there are spam
	// 		return;
	// 	}
	// };

	//back button brings it back to sign in
	const iconHandler = () => {
		navigate("/home");
	};

	return (
		<div style={Styles.verificationPageContainerStyle}>
			<div style={Styles.backButtonStyle}>
				<ArrowBackOutlinedIcon
					sx={{ color: "white", fontSize: 70, cursor: "pointer" }}
					onClick={iconHandler}
				/>
			</div>

			<div style={Styles.mainContainerStyle}>
				<div style={Styles.iconStyle}>
					<MarkEmailReadOutlinedIcon
						sx={{ color: "#ffdbe9", fontSize: 120 }}
					/>
				</div>
				<div style={Styles.textStyle}>
					<p>{verifytext}</p>
				</div>
				<div style={Styles.innerTextStyle}>
					<p>{verifytextInner}</p>
				</div>
				<div style={Styles.buttonStyle}>
					<Button
						variant="outlined"
						sx={{
							backgroundColor: "pink",
							color: "white",
							borderColor: "white",
							"&:hover": {
								borderColor: "white",
							},
						}}
						endIcon={<LoopIcon />}
						size="large"
						onClick={() => {}}
					>
						Become an admin
					</Button>
				</div>
			</div>
		</div>
	);
};

const verifytext = "Want to become an admin?";
const verifytextInner =
	"You will be able to contribute to the community by adding questions, deleting questions " +
	"and updating questions";

export default AdminPage;
