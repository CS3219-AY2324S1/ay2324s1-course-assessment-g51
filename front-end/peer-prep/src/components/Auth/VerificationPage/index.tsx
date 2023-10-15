import { Button } from "@mui/material";
import * as Styles from "./styles";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
	return (
		<div style={Styles.VerificationPageContainerStyle}>
			<div style={Styles.mainContainerStyle}>
				<div style={Styles.textStyle}>
					<p>{verifytext}</p>
				</div>
				<div style={Styles.innerTextStyle}>
					<p>{verifytextInner}</p>
				</div>
			</div>
		</div>
	);
};

// const GoodbyePlayer = () => {
// 	return (
// 		<Player
// 			autoplay
// 			loop
// 			src="https://lottie.host/c3a4bc88-ed72-42ba-9396-74d062d4a479/1IoiS7ld5t.json"
// 			style={Styles.goodbyePlayerStyle}
// 		>
// 			<Controls visible={false} />
// 		</Player>
// 	);
// };

const verifytext = "Thanks for joining peerprep";
const verifytextInner =
	"To complete your profile we will need you to \
                    verify your email address by clicking on the link sent to your email";

export default VerificationPage;
