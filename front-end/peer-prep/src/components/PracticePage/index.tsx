import Button from "@mui/material/Button";
import BuildingPlayer from "../Building";
import * as Styles from "./styles";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as PracticeSlice from "../redux/reducers/Practice/PracticeSlice"
import MatchingServicePopUp from "../MatchingServicePopUp";
import * as MatchSlice from "../redux/reducers/Match/MatchSlice";
import QuestionView from "./QuestionView";
import CodeView from "./CodeView";
import ChatView from "./ChatView"

const PracticePage = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <div id="PracticePage" style={Styles.practicePageContainerStyle}>
                <QuestionView/>
                <ChatView/>
                <Button sx={{marginRight: "25%"}} variant="contained" onClick={() => dispatch(PracticeSlice.toggleFindPartnerButton(true))}>Find Partner</Button>
            </div>
            <BackdropMatchingService />
        </div>


    )
}

const BackdropMatchingService = () => {
    const dispatch = useDispatch();
    const isFindPartnerButtonPressed = useSelector(PracticeSlice.selectFindButtonState);
    const matchResponse = useSelector(MatchSlice.selectMatchResponse);
    if (matchResponse !== "") {
        setTimeout(() => {
            dispatch(PracticeSlice.toggleFindPartnerButton(false))
        }, 4000)
    }
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
