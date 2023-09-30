import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../reducers/Question/QuestionSlice"

const store = configureStore({
    // root reducer
    reducer: {
        // state.key : slice reducer function
        /*
            Example:
            users: usersReducer
            the actual state is -> state.users -> which is a slice of the bigger "state"
        */
       question: questionReducer
    }
});

export default store;