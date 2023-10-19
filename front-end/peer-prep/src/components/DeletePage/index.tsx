import { Button } from "@mui/material"
import * as Styles from "./styles"
import { Controls, Player } from "@lottiefiles/react-lottie-player"
import { useNavigate } from "react-router-dom"

const DeletePage = () => {
    const navigate = useNavigate()
    return (
        <div style={Styles.deletePageContainerStyle}>
            <div style={Styles.textContainerStyle}>
                <DeletePlayer/>
                <span>{deleteText}</span>
                <div style={Styles.redirectContainerStyle}>
                    <Button sx={Styles.loginButtonStyle} onClick={() => navigate("/signin")}>Sign In</Button>
                </div>
            </div>
        </div>
    )
}

const DeletePlayer = () => {
    return (
        <Player
            autoplay
            loop
            src="https://lottie.host/c3a4bc88-ed72-42ba-9396-74d062d4a479/1IoiS7ld5t.json"
            style={Styles.deletePlayerStyle}
        >
            <Controls visible={false}/>
        </Player>
    )
}

const deleteText = "You have deleted your account! See you next time!"

export default DeletePage
