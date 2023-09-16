import {createSlice} from "@reduxjs/toolkit"

const homeSlice = createSlice({
    name:"home",
    initialState: {
        /*
        Example:
            isButtonShown: false,
            data: {
                sound: true,
                lightMode: false,
            }
        */
       isButtonShown: false,
    },
    reducers: {
        // do something -> action
        /*
        Example:
            toggleSomeButton(state,action) {
                switch(action.payload) {
                    case "click": {
                        state.isButtonShown = false;
                        break;
                    default:
                        break;
                    }
                }
            }
        */
        toggleSomeButton(state,action) {
            switch(action.payload) {
                case "click": {
                    state.isButtonShown = false;
                    break;
                }
                default:
                    break;
            }
        },
    }
});

// export actions
// Example: export const {toggleSomeButton} = homeSlice.actions
export const {toggleSomeButton} = homeSlice.actions;

// export reducers
export default homeSlice.reducer;

// export selectors
// selectors allow you to listen to state changes on the fly
/*
    Example:
    export const selectButtonShownStatus = (state) => state.home.isButtonShown;
*/