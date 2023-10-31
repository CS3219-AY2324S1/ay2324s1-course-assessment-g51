import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMatchState {
    languagesChosen: string[]
    complexityChosen: string
}

const matchSlice = createSlice({
    name: "match",
    initialState: {
        languagesChosen: ["python"],
        complexityChosen: "easy"
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
        }
    }
})

export const { setLanguages, setComplexity } = matchSlice.actions;

export default matchSlice.reducer;

export const selectLanguagesChosen = (state: any) => state.match.languagesChosen;
export const selectComplexityChosen = (state: any) => state.match.complexityChosen;
