import { Controls, Player } from "@lottiefiles/react-lottie-player"
import * as Styles from "./styles"

const BuildingPlayer = ({ otherStyles }: { otherStyles: object }) => {
    return (
        <Player
            autoplay
            loop
            src="https://lottie.host/3cfcf9de-e3fb-44e7-b3ed-72b5c66be9c0/xYSsxrWU46.json"
            style={{ ...otherStyles, ...Styles.buildingPlayerStyle }}
        >
            <Controls visible={false} />
        </Player>
    )
}

export default BuildingPlayer
