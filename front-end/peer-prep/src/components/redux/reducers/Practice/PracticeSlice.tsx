import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPracticeState {
	isFindPartnerButtonPressed: boolean;
	language: string;
}

const practiceSlice = createSlice({
	name: "practice",
	initialState: {
		isFindPartnerButtonPressed: false,
		language: "python",
	} as IPracticeState,
	reducers: {
		toggleFindPartnerButton(state, action: PayloadAction<boolean>) {
			state.isFindPartnerButtonPressed = action.payload;
		},
		setLanguage(state, action: PayloadAction<string>) {
			state.language = action.payload;
		},
	},
});

export const { toggleFindPartnerButton, setLanguage } = practiceSlice.actions;

export default practiceSlice.reducer;

export const selectFindButtonState = (state: any) =>
	state.practice.isFindPartnerButtonPressed;

export const selectLanguageState = (state: any) => state.practice.language;
