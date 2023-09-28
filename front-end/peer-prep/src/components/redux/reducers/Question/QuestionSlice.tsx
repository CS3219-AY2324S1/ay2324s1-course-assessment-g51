import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name: "question",
    initialState: {
        isAddQuestionButtonToggled: false

    },
    reducers: {
        toggleAddQuestionButton(state) {
            state.isAddQuestionButtonToggled = 
                !state.isAddQuestionButtonToggled
        }

    }
})

// export actions
// Example: export const {toggleSomeButton} = homeSlice.actions
export const {toggleAddQuestionButton} = questionSlice.actions

// export main reducer
export default questionSlice.reducer;

// export selectors
// selectors allow you to listen to state changes on the fly
/*
    Example:
    export const selectButtonShownStatus = (state) => state.home.isButtonShown;
*/
export const selectAddQuestionButtonStatus = (state:any) => state.question.isAddQuestionButtonToggled