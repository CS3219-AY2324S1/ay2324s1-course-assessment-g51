import { Button } from "@mui/material";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useEffect } from "react";

const RequestPage = () => {
	const navigate = useNavigate();

	//back button brings it back to sign in
	const iconHandler = () => {
		navigate("/home");
		//window.location.reload();
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
					<AdminPanelSettingsIcon
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
						endIcon={<NavigateNextIcon />}
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
	"You will be able to contribute to the community by managing our question pool";

export default RequestPage;
