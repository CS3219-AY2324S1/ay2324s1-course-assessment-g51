import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMatchState {
    languagesChosen: string[],
    complexityChosen: string,
    partnerDetails: IPartnerDetails,
    matchResponse: string
}

interface IPartnerDetails {
    userId1: string
    userId2: string
    complexity: string
    matchId: string
    language: string
}

const matchSlice = createSlice({
    name: "match",
    initialState: {
        languagesChosen: ["python"],
        complexityChosen: "easy",
        partnerDetails: {
            userId1: "",
            userId2: "",
            complexity: "",
            matchId: "",
            language: ""
        },
        matchResponse: ""
    } as IMatchState,
    reducers: {
        setLanguages(state, action: PayloadAction<string[]>) {
            if (action.payload == null) {
                state.languagesChosen = ["python", "java", "javascript", "c#"];
            } else {
                state.languagesChosen = action.payload;
            }
        },
        setComplexity(state, action: PayloadAction<string>) {
            state.complexityChosen = action.payload
        },
        setPartnerDetails(state, action: PayloadAction<IPartnerDetails>) {

            state.partnerDetails = action.payload
        },
        setMatchResponse(state, action: PayloadAction<string>) {
            state.matchResponse = action.payload
        }
    }
})

export const { setLanguages, setComplexity, setPartnerDetails, setMatchResponse } = matchSlice.actions;

export default matchSlice.reducer;

export const selectLanguagesChosen = (state: { match: IMatchState }) => state.match.languagesChosen;
export const selectComplexityChosen = (state: { match: IMatchState }) => state.match.complexityChosen;
export const selectPartnerDetails = (state: { match: IMatchState }) => state.match.partnerDetails;
export const selectRoomId = (state: { match: IMatchState }) => state.match.partnerDetails.matchId;
export const selectMatchResponse = (state: { match: IMatchState }) => state.match.matchResponse;
