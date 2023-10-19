import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface questionState {
    isAddQuestionButtonToggled: boolean,
    currentId: string,
    currentTitle: string,
    currentComplexity: string,
    currentCategories: string[],
    currentDescription: string,
    questionsData: questionFormat[]
}

interface questionFormat {
    "Id" : string,
    "Title": string,
    "Categories": string[],
    "Complexity": string,
    "Description": string
}

const questionSlice = createSlice({
    name: "question",
    initialState: {
        isAddQuestionButtonToggled: false,
        currentId: "0",
        currentTitle: "",
        currentComplexity: "",
        currentCategories: [""],
        currentDescription: "",
        questionsData: [
            {
                "Id" : "1",
                "Title": "Reverse a String",
                "Categories": ["Strings", "Algorithms"],
                "Complexity": "Easy",
                "Description" : "hhh"
            },
            {
                "Id": "2",
                "Title": "Linked List Cycle Detection",
                "Categories": ["Data Structures", "Algorithms"],
                "Complexity": "Easy",
                "Description" : "xxx"
            },
            {
                "Id": "3",
                "Title": "Roman to Integer",
                "Categories": ["Algorithms"],
                "Complexity": "Easy",
                "Description" : "zzz"
            },
            {
                "Id": "4",
                "Title": "Add Binary",
                "Categories": ["Bit Manipulation", "Algorithms"],
                "Complexity": "Easy",
                "Description" : "heheh"
            },
            {
                "Id": "5",
                "Title": "Fibonacci Number",
                "Categories": ["Recursion", "Algorithms"],
                "Complexity": "Easy",
                "Description" : "what"
            },
            {
                "Id": "6",
                "Title": "Implement Stack using Queues ",
                "Categories": ["Data Structures"],
                "Complexity": "Easy",
                "Description" : "test"
            },
            {
                "Id": "7",
                "Title": "Combine Two Tables",
                "Categories": ["Databases"],
                "Complexity": "Easy",
                "Description" : "check"
            },
            {
                "Id": "8",
                "Title": "Repeated DNA Sequences",
                "Categories": ["Algorithms", "Bit Manipulation"],
                "Complexity": "Medium",
                "Description" : "nope"
            },
            {
                "Id": "9",
                "Title": "Course Schedule",
                "Categories": ["Data Structures", "Algorithms"],
                "Complexity": "Medium",
                "Description" : ""
            },
            {
                "Id": "10",
                "Title": "LRU Cache Design",
                "Categories": ["Data Structures"],
                "Complexity": "Medium",
                "Description" : ""
            }
        ]
    } as questionState,
    reducers: {
        toggleAddQuestionButton(state) {
            state.isAddQuestionButtonToggled = true
        },
        updateCurrentId(state,action: PayloadAction<string>) {
            const newId = action.payload
            const indexToRetrieve = state.questionsData.findIndex(item => item.Id === (newId));
            state.currentId = newId
            state.currentTitle = state.questionsData[indexToRetrieve].Title
            state.currentCategories = state.questionsData[indexToRetrieve].Categories
            state.currentComplexity = state.questionsData[indexToRetrieve].Complexity
            state.currentDescription = state.questionsData[indexToRetrieve].Description
        },
        updateCurrentTitle(state,action: PayloadAction<string>) {
            state.currentTitle = action.payload
        },
        updateCurrentComplexity(state,action: PayloadAction<string>) {
            state.currentComplexity = action.payload
        },
        updateCurrentCategories(state,action: PayloadAction<string>) {
            const currentCategoryData = action.payload;
            // state.currentCategories.pop();
            state.currentCategories.push(currentCategoryData);
        },
        updateCurrentDescription(state,action: PayloadAction<string>) {
            state.currentDescription = action.payload
        },
        // once a new question is added, show that the question is added!
        addNewQuestion(state) {
            const newQuestion = {
                "Id": state.currentId,
                "Title": state.currentTitle,
                "Categories": state.currentCategories,
                "Complexity": state.currentComplexity,
                "Description": state.currentDescription
            }
            state.questionsData.push(newQuestion);
            state.isAddQuestionButtonToggled = false;
        },
        clearQuestionCreator(state) {
            state.currentTitle = "";
            state.currentCategories = [""];
            state.currentComplexity = "";
            state.currentDescription = "";
        },
        initializeQuestionCreator(state:questionState) {
            state.currentId = state.questionsData[0].Id
            state.currentTitle = state.questionsData[0].Title
            state.currentCategories = state.questionsData[0].Categories
            state.currentComplexity = state.questionsData[0].Complexity
            state.currentDescription = state.questionsData[0].Description
        },
        updateCurrentQuestion(state) {
            let newQuestionsData = state.questionsData.filter(
                (question:questionFormat) => question.Id !== state.currentId
            )
            const updatedQuestion:questionFormat = {
                "Id" : state.currentId,
                "Title": state.currentTitle,
                "Categories": state.currentCategories,
                "Complexity": state.currentComplexity,
                "Description": state.currentDescription
            }
            const currentIndex = parseInt(state.currentId) - 1
            newQuestionsData.splice(currentIndex, 0, updatedQuestion);
            state.questionsData = newQuestionsData;
        },
        createNewQuestion(state) {
            state.currentId = String(state.questionsData.length + 1)
            state.currentTitle = "";
            state.currentCategories = [""];
            state.currentComplexity = "";
            state.currentDescription = "";
        },
        deleteQuestion(state, action: PayloadAction<string>) {
            const indexToDelete = state.questionsData.findIndex(item => item.Id === (action.payload));

            if (state.questionsData.length > 1)  {
                state.questionsData.splice(indexToDelete, 1);
                state.currentId = state.questionsData[0].Id
                state.currentTitle = state.questionsData[0].Title
                state.currentCategories = state.questionsData[0].Categories
                state.currentComplexity = state.questionsData[0].Complexity
                state.currentDescription = state.questionsData[0].Description
                // todo add delete api when ready
            } else {
                state.questionsData.splice(indexToDelete, 1);
                state.currentId = ""
                state.currentTitle = ""
                state.currentCategories = [""]
                state.currentComplexity = ""
                state.currentDescription = ""
            }
        },
        deleteFromCurrentCategories(state, action:PayloadAction<number>) {
            const categoryToDelete = action.payload;
            state.currentCategories.splice(categoryToDelete, 1);
        }
    }
})

// export actions
// Example: export const {toggleSomeButton} = homeSlice.actions
export const { toggleAddQuestionButton,
    updateCurrentTitle, updateCurrentComplexity,
    updateCurrentCategories, updateCurrentDescription, 
    addNewQuestion, clearQuestionCreator, 
    initializeQuestionCreator, updateCurrentId,
    updateCurrentQuestion, createNewQuestion, deleteQuestion, deleteFromCurrentCategories } = questionSlice.actions

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
export const selectCurrentCategories = (state:any) => state.question.currentCategories
export const selectCurrentDescription = (state:any) => state.question.currentDescription
export const selectQuestionsData = (state:any) => state.question.questionsData
export const selectNumOfQuestions = (state:any) => state.question.questionsData.length