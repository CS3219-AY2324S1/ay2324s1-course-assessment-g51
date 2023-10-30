import Button from "@mui/material/Button";
import BuildingPlayer from "../Building";
import * as Styles from "./styles";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as PracticeSlice from "../redux/reducers/Practice/PracticeSlice"
import MatchingServicePopUp from "../MatchingServicePopUp";

const PracticePage = () => {
    const dispatch = useDispatch()
    return (
        <div id="PracticePage" style={Styles.practicePageContainerStyle}>
            <BuildingPlayer otherStyles={Styles.buildingPlayerStyle} />
            <Button variant="contained" onClick={() => dispatch(PracticeSlice.toggleFindPartnerButton(true))}>Find Partner</Button>
            <BackdropMatchingService />
        </div>
    )
}

const BackdropMatchingService = () => {
    const dispatch = useDispatch()
    const isFindPartnerButtonPressed = useSelector(PracticeSlice.selectFindButtonState)
    return (
        <Dialog
            onClose={() => dispatch(PracticeSlice.toggleFindPartnerButton(false))}
            open={isFindPartnerButtonPressed}
            sx={Styles.dialogContainerStyle}
        >
            <MatchingServicePopUp />
        </Dialog >
    )
}

export default PracticePage
