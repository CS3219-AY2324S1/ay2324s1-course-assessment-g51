import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface questionState {
    isAddQuestionButtonToggled: boolean,
    currentId: string,
    currentTitle: string,
    currentComplexity: string,
    currentCategories: string[],
    currentDescription: string,
    questionsData: questionFormat[],
    categoryBuffer: string
}

interface questionFormat {
    "_id": string,
    "title": string,
    "category": string[],
    "complexity": string,
    "description": string
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
        questionsData: [],
        categoryBuffer: ""
    } as questionState,
    reducers: {
        toggleAddQuestionButton(state, action: PayloadAction<boolean>) {
            state.isAddQuestionButtonToggled = action.payload
        },
        updateCurrentId(state, action: PayloadAction<string>) {
            const newId = action.payload
            const indexToRetrieve = state.questionsData.findIndex(item => item._id === (newId));
            state.currentId = newId
            state.currentTitle = state.questionsData[indexToRetrieve].title
            state.currentCategories = state.questionsData[indexToRetrieve].category
            state.currentComplexity = state.questionsData[indexToRetrieve].complexity
            state.currentDescription = state.questionsData[indexToRetrieve].description
        },
        updateCurrentTitle(state, action: PayloadAction<string>) {
            state.currentTitle = action.payload
        },
        updateCurrentComplexity(state, action: PayloadAction<string>) {
            state.currentComplexity = action.payload
        },
        updateCurrentCategories(state, action: PayloadAction<string>) {
            const currentCategoryData = action.payload;
            state.currentCategories.push(currentCategoryData);
        },
        updateAllCurrentCatogires(state, action:PayloadAction<string[]>) {
            state.currentCategories = action.payload;
        },
        updateCurrentDescription(state, action: PayloadAction<string>) {
            state.currentDescription = action.payload;
        },
        initializeQuestionData(state, action: PayloadAction<questionFormat[]>) {
            state.questionsData = action.payload;
        },
        // once a new question is added, show that the question is added!
        addNewQuestion(state, action: PayloadAction<string>) {
            const newQuestion = {
                "_id": action.payload,
                "title": state.currentTitle,
                "category": state.currentCategories,
                "complexity": state.currentComplexity,
                "description": state.currentDescription
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
        initializeQuestionCreator(state: questionState, action: PayloadAction<questionFormat[]>) {
            const firstQuestion = action.payload[0]
            state.currentId = firstQuestion._id
            state.currentTitle = firstQuestion.title
            state.currentCategories = firstQuestion.category
            state.currentComplexity = firstQuestion.complexity
            state.currentDescription = firstQuestion.description
        },
        updateCurrentQuestion(state) {
            let newQuestionsData = state.questionsData.filter(
                (question: questionFormat) => question._id !== state.currentId
            )
            const updatedQuestion: questionFormat = {
                "_id": state.currentId,
                "title": state.currentTitle,
                "category": state.currentCategories,
                "complexity": state.currentComplexity,
                "description": state.currentDescription
            }
            // const currentIndex = parseInt(state.currentId) - 1
            const currentIndex = state.questionsData.findIndex(item => item._id === (state.currentId));
            newQuestionsData.splice(currentIndex, 0, updatedQuestion);
            state.questionsData = newQuestionsData;
        },
        createNewQuestion(state) {
            state.currentId = String(Date.now()) // temporarily using date to ensure unique id b4 merging with backend
            state.currentTitle = "";
            state.currentCategories = [];
            state.currentComplexity = "";
            state.currentDescription = "";
        },
        deleteQuestion(state, action: PayloadAction<string>) {
            const indexToDelete = state.questionsData.findIndex(item => item._id === (action.payload));

            if (state.questionsData.length > 1) {
                state.questionsData.splice(indexToDelete, 1);
                state.currentId = state.questionsData[0]._id
                state.currentTitle = state.questionsData[0].title
                state.currentCategories = state.questionsData[0].category
                state.currentComplexity = state.questionsData[0].complexity
                state.currentDescription = state.questionsData[0].description
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
        deleteFromCurrentCategories(state, action: PayloadAction<number>) {
            const categoryToDelete = action.payload
            state.currentCategories.splice(categoryToDelete, 1)
        },
        updateCategoryBuffer(state, action: PayloadAction<string>) {
            state.categoryBuffer = (action.payload)
        },
        clearCategoryBuffer(state) {
            state.categoryBuffer = ""
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
    updateCurrentQuestion, createNewQuestion, deleteQuestion, deleteFromCurrentCategories,
    updateCategoryBuffer, clearCategoryBuffer, initializeQuestionData, updateAllCurrentCatogires } = questionSlice.actions

// export main reducer
export default questionSlice.reducer;

// export selectors
// selectors allow you to listen to state changes on the fly
/*
    Example:
    export const selectButtonShownStatus = (state) => state.home.isButtonShown;
*/
export const selectAddQuestionButtonStatus = (state: any) => state.question.isAddQuestionButtonToggled
export const selectCurrentId = (state: any) => state.question.currentId
export const selectCurrentTitle = (state: any) => state.question.currentTitle
export const selectCurrentComplexity = (state: any) => state.question.currentComplexity
export const selectCurrentCategories = (state: any) => state.question.currentCategories
export const selectCurrentDescription = (state: any) => state.question.currentDescription
export const selectQuestionsData = (state: any) => state.question.questionsData
export const selectNumOfQuestions = (state: any) => state.question.questionsData.length
export const selectCategoryBuffer = (state: any) => state.question.categoryBuffer
