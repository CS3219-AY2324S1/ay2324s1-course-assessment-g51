import { Button } from "@mui/material"
import * as Styles from "./styles"
import { Controls, Player } from "@lottiefiles/react-lottie-player"
import { useNavigate } from "react-router-dom"

const GoodbyePage = () => {
    const navigate = useNavigate()
    return (
        <div style={Styles.GoodbyePageContainerStyle}>
            <div style={Styles.textContainerStyle}>
                <GoodbyePlayer/>
                <span>{goodbyeText}</span>
                <div style={Styles.redirectContainerStyle}>
                    <span style={Styles.redirectTextStyle}>{redirectText}</span>
                    <Button sx={Styles.loginButtonStyle} onClick={() => navigate("/signin")}>Sign In</Button>
                </div>
            </div>
        </div>
    )
}

const GoodbyePlayer = () => {
    return (
        <Player
            autoplay
            loop
            src="https://lottie.host/c3a4bc88-ed72-42ba-9396-74d062d4a479/1IoiS7ld5t.json"
            style={Styles.goodbyePlayerStyle}
        >
            <Controls visible={false}/>
        </Player>
    )
}

const goodbyeText = "You have signed out! See you next time!"
const redirectText = "Stil up for the grind?"

export default GoodbyePage