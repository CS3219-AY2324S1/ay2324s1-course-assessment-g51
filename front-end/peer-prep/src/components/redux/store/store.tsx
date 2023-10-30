import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../reducers/Question/QuestionSlice"
import userReducer from "../reducers/User/UserSlice"
import practiceReducer from "../reducers/Practice/PracticeSlice"

const store = configureStore({
    // root reducer
    reducer: {
        // state.key : slice reducer function
        /*
            Example:
            users: usersReducer
            the actual state is -> state.users -> which is a slice of the bigger "state"
        */
        question: questionReducer,
        user: userReducer,
        practice: practiceReducer
    }
});

export default store;
