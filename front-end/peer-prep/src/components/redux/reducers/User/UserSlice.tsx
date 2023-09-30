import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    isEditUserButtonToggled: boolean,
    currentUsername: string,
    currentEmail: string,
    currentPassword: string,
    currentFirstName: string,
    currentLastName: string,
    currentAge: string
}

interface userFormat {
    "Username": string,
    "Email": string,
    "Password": string,
    "FirstName": string,
    "LastName": string,
    "Age": string
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        isEditUserButtonToggled: false,
        currentUsername: "",
        currentEmail: "",
        currentPassword: "",
        currentFirstName: "",
        currentLastName: "",
        currentAge: ""
    } as userState,
    reducers: {
        updateCurrentUsername(state,action: PayloadAction<string>) {
            state.currentUsername = action.payload
        },
        updateCurrentEmail(state,action: PayloadAction<string>) {
            state.currentEmail = action.payload
        },
        updateCurrentPassword(state,action: PayloadAction<string>) {
            state.currentPassword = action.payload
        },
        updateCurrentFirstName(state,action: PayloadAction<string>) {
            state.currentFirstName = action.payload
        },
        updateCurrentLastName(state,action: PayloadAction<string>) {
            state.currentLastName = action.payload
        },
        updateCurrentAge(state,action: PayloadAction<string>) {
            state.currentAge = action.payload
        },
    }
})

export const { updateCurrentUsername, updateCurrentEmail, 
    updateCurrentPassword, updateCurrentFirstName, 
    updateCurrentLastName, updateCurrentAge} = userSlice.actions

export default userSlice.reducer;

export const selectCurrentUsername = (state:any) => state.user.currentUsername
export const selectCurrentEmail = (state:any) => state.user.currentEmail
export const selectCurrentPassword = (state:any) => state.user.currentPassword
export const selectCurrentFirstName = (state:any) => state.user.currentFirstName
export const selectCurrentLastName = (state:any) => state.user.currentLastName
export const selectCurrentAge = (state:any) => state.user.currentAge
