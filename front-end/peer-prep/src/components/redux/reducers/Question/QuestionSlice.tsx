import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface questionState {
    isAddQuestionButtonToggled: boolean,
    currentId: number,
    currentTitle: string,
    currentComplexity: string,
    currentCategories: string[],
    currentDescription: string,
    questionsData: object[]
}

const questionSlice = createSlice({
    name: "question",
    initialState: {
        isAddQuestionButtonToggled: false,
        currentId: 11,
        currentTitle: "",
        currentComplexity: "",
        currentCategories: [""],
        currentDescription: "",
        questionsData: [
            {
                "Id" : "1",
                "Title": "Reverse a String",
                "Categories": ["Strings", "Algorithms"],
                "Complexity": "Easy"
            },
            {
                "Id": "2",
                "Title": "Linked List Cycle Detection",
                "Categories": ["Data Structures", "Algorithms"],
                "Complexity": "Easy"
            },
            {
                "Id": "3",
                "Title": "Roman to Integer",
                "Categories": ["Algorithms"],
                "Complexity": "Easy"
            },
            {
                "Id": "4",
                "Title": "Add Binary",
                "Categories": ["Bit Manipulation", "Algorithms"],
                "Complexity": "Easy"
            },
            {
                "Id": "5",
                "Title": "Fibonacci Number",
                "Categories": ["Recursion", "Algorithms"],
                "Complexity": "Easy"
            },
            {
                "Id": "6",
                "Title": "Implement Stack using Queues ",
                "Categories": ["Data Structures"],
                "Complexity": "Easy"
            },
            {
                "Id": "7",
                "Title": "Combine Two Tables",
                "Categories": ["Databases"],
                "Complexity": "Easy"
            },
            {
                "Id": "8",
                "Title": "Repeated DNA Sequences",
                "Categories": ["Algorithms", "Bit Manipulation"],
                "Complexity": "Medium"
            },
            {
                "Id": "9",
                "Title": "Course Schedule",
                "Categories": ["Data Structures", "Algorithms"],
                "Complexity": "Medium"
            },
            {
                "Id": "10",
                "Title": "LRU Cache Design",
                "Categories": ["Data Structures"],
                "Complexity": "Medium"
            }
        ]
    } as questionState,
    reducers: {
        toggleAddQuestionButton(state) {
            state.isAddQuestionButtonToggled = 
                !state.isAddQuestionButtonToggled
        },
        addCurrentId(state) {
            state.currentId += 1
        },
        updateCurrentTitle(state,action: PayloadAction<string>) {
            state.currentTitle = action.payload
        },
        updateCurrentComplexity(state,action: PayloadAction<string>) {
            state.currentComplexity = action.payload
        },
        updateCurrentCategories(state,action: PayloadAction<string>) {
            const currentCategoryData = action.payload;
            state.currentCategories.pop();
            state.currentCategories.push(currentCategoryData);
        },
        updateCurrentDescription(state,action: PayloadAction<string>) {
            state.currentDescription = action.payload
        },
        addNewQuestion(state) {
            const newQuestion = {
                "Id": state.currentId,
                "Title": state.currentTitle,
                "Categories": state.currentCategories,
                "Complexity": state.currentComplexity,
                "Description": state.currentDescription
            }
            state.questionsData.push(newQuestion);
            state.currentId += 1;
        },
        clearQuestionCreator(state) {
            state.currentTitle = "";
            state.currentCategories = [""];
            state.currentComplexity = "";
            state.currentDescription = "";
        },
    }
})

// export actions
// Example: export const {toggleSomeButton} = homeSlice.actions
export const {toggleAddQuestionButton, addCurrentId,
    updateCurrentTitle, updateCurrentComplexity,
    updateCurrentCategories, updateCurrentDescription, 
    addNewQuestion, clearQuestionCreator} = questionSlice.actions

// export main reducer
export default questionSlice.reducer;

// export selectors
// selectors allow you to listen to state changes on the fly
/*
    Example:
    export const selectButtonShownStatus = (state) => state.home.isButtonShown;
*/
export const selectAddQuestionButtonStatus = (state:any) => state.question.isAddQuestionButtonToggled
export const selectCurrentId = (state:any) => state.question.currentId
export const selectCurrentTitle = (state:any) => state.question.currentTitle
export const selectCurrentComplexity = (state:any) => state.question.currentComplexity
export const selectCurrentCategories = (state:any) => state.question.currentCategories[0]
export const selectCurrentDescription = (state:any) => state.question.currentDescription
export const selectQuestionsData = (state:any) => state.question.questionsData