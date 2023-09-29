import * as Styles from "./styles"
import { Player, Controls } from "@lottiefiles/react-lottie-player"

const ErrorPage = () => {
    return(
        <div id="ErrorPageContainer" style={Styles.errorPageContainerStyle}>
            <ErrorContainer/>
        </div>
    )
}

const ErrorContainer = () => {
    return (
        <div id="ErrorContainer" style={Styles.errorContainerStyle}>
            <EyePlayer/>
            <SorryText/>
        </div>
    )
}

const SorryText = () => {
    return (
        <div id="SorryTextContainer" style={Styles.sorryContainerStyle}>
            <p style={Styles.sorryStyle}>SORRY, THERE'S <span style={{color: "pink"}}>NOTHING HERE</span>
            </p>
        </div>
    )
}

const EyePlayer = () => {
    return (
        <div id="EyePlayerContainer" style={Styles.EyePlayerContainerStyle}>
            4
            <Player
                autoplay
                loop
                src="https://lottie.host/2e49e9c0-9915-4e88-99e7-c9eb0fb88b6e/408Jcswo4t.json"
                style={{ height: '300px', width: '300px' }}
            >
                <Controls visible={false}/>
            </Player>
            4
        </div>
    )
}

export default ErrorPage;