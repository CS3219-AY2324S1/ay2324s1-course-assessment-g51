import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
    isFirstTimeLogin: boolean,
    currentUsername: string,
    currentEmail: string,
    currentFirstName: string,
    currentLastName: string,
    currentAge: number,
    isAdmin: boolean
}

interface userFormat {
    "username": string,
    "email": string,
    "firstName": string,
    "lastName": string,
    "age": number,
    "isAdmin": boolean
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        isFirstTimeLogin: false,
        currentUsername: "",
        currentEmail: "",
        currentFirstName: "",
        currentLastName: "",
        currentAge: 0,
        isAdmin: false
    } as userState,
    reducers: {
        setIsFirstTimeLogin(state, action: PayloadAction<boolean>) {
            state.isFirstTimeLogin = action.payload;
        },
        updateUserData(state, action: PayloadAction<userFormat>) {
            state.currentUsername = action.payload.username
            state.currentEmail = action.payload.email
            state.currentFirstName = action.payload.firstName
            state.currentLastName = action.payload.lastName
            state.currentAge = action.payload.age
            state.isAdmin = action.payload.isAdmin
        },
        updateCurrentUsername(state, action: PayloadAction<string>) {
            state.currentUsername = action.payload
        },
        updateCurrentEmail(state, action: PayloadAction<string>) {
            state.currentEmail = action.payload
        },
        updateCurrentFirstName(state, action: PayloadAction<string>) {
            state.currentFirstName = action.payload
        },
        updateCurrentLastName(state, action: PayloadAction<string>) {
            state.currentLastName = action.payload
        },
        updateCurrentAge(state, action: PayloadAction<string>) {
            let updatedAge = action.payload === "" ? "0" : action.payload
            state.currentAge = parseInt(updatedAge)
        },
        updateIsAdmin(state, action: PayloadAction<boolean>) {
            state.isAdmin = action.payload
        }
    }
})

export const { updateUserData, updateCurrentUsername, updateCurrentEmail,
    updateCurrentFirstName, updateCurrentLastName,
    updateCurrentAge, setIsFirstTimeLogin, updateIsAdmin } = userSlice.actions

export default userSlice.reducer;

export const selectCurrentUsername = (state: any) => state.user.currentUsername
export const selectCurrentEmail = (state: any) => state.user.currentEmail
export const selectCurrentFirstName = (state: any) => state.user.currentFirstName
export const selectCurrentLastName = (state: any) => state.user.currentLastName
export const selectCurrentAge = (state: any) => state.user.currentAge
export const selectIsFirstTimeLogin = (state: any) => state.user.isFirstTimeLogin
export const isUserAnAdmin = (state: any) => state.user.isAdmin
