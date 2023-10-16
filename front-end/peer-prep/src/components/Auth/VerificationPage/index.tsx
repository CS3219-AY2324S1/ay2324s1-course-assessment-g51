import { Button } from "@mui/material";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { auth } from "../Firebase";

const VerificationPage = () => {
	const navigate = useNavigate();

	const timer = setInterval(() => {
		auth.currentUser?.reload();
		if (auth.currentUser?.emailVerified) {
			console.log("Email Verified!");
			clearInterval(timer);
			navigate("/home");
		} else {
			console.log("test");
		}
	}, 7000);

	return (
		<div style={Styles.VerificationPageContainerStyle}>
			<div style={Styles.BackButtonStyle}>
				<ArrowBackOutlinedIcon sx={{ color: "white", fontSize: 70 }} />
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
					<p style={Styles.resendTextStyle}>{resendtext}</p>
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
					>
						resend
					</Button>
				</div>
			</div>
		</div>
	);
};

const verifytext = "Thanks for joining peerprep";
const verifytextInner =
	"To complete your profile we will need you to" +
	"verify your email address by clicking on the link sent to your email";

const resendtext = "Did not receive email?";
export default VerificationPage;
