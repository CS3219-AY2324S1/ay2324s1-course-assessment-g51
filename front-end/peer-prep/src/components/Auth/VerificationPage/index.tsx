import { Button } from "@mui/material";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { auth } from "../Firebase";
import { sendEmailVerification } from "firebase/auth";

const VerificationPage = () => {
	const navigate = useNavigate();

	//poll every 7 seconds to check whether email is updated
	//have to do this because firebase does not update the state
	//whether email is verified or not
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

	//resent verification email once button is pressed
	//firebase will block on its own if it is spammed
	const buttonHandler = async () => {
		const currentUser = auth.currentUser;
		try {
			if (currentUser) {
				await sendEmailVerification(currentUser).then(() => {
					// Email verification sent!
					// ...
				});
			}
		} catch (e) {
			//firebase will auto block request if there are spam
			return;
		}
	};

	//back button brings it back to sign in
	const iconHandler = () => {
		navigate("/signin");
	};

	return (
		<div style={Styles.VerificationPageContainerStyle}>
			<div style={Styles.BackButtonStyle}>
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
						onClick={buttonHandler}
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
