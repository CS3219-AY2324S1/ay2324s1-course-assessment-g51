import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPracticeState {
    isFindPartnerButtonPressed: boolean
}

const practiceSlice = createSlice({
    name: "practice",
    initialState: {
        isFindPartnerButtonPressed: false
    } as IPracticeState,
    reducers: {
        toggleFindPartnerButton(state, action: PayloadAction<boolean>) {
            state.isFindPartnerButtonPressed = action.payload
        }
    }
})

export const { toggleFindPartnerButton } = practiceSlice.actions;

export default practiceSlice.reducer;

export const selectFindButtonState = (state: any) => state.practice.isFindPartnerButtonPressed;

