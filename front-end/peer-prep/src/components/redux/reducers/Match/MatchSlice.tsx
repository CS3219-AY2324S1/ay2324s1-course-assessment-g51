import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMatchState {
    languagesChosen: string[]
    complexityChosen: string
    partnerDetails: {}
    matchResponse: string
}

const matchSlice = createSlice({
    name: "match",
    initialState: {
        languagesChosen: ["python"],
        complexityChosen: "easy",
        partnerDetails: {},
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
        setPartnerDetails(state, action: PayloadAction<object>) {
            state.partnerDetails = action.payload
        },
        setMatchResponse(state, action: PayloadAction<string>) {
            state.matchResponse = action.payload
        }
    }
})

export const { setLanguages, setComplexity, setPartnerDetails, setMatchResponse } = matchSlice.actions;

export default matchSlice.reducer;

export const selectLanguagesChosen = (state: any) => state.match.languagesChosen;
export const selectComplexityChosen = (state: any) => state.match.complexityChosen;
export const selectPartnerDetails = (state: any) => state.match.partnerDetails;
export const selectMatchResponse = (state: any) => state.match.matchResponse;
