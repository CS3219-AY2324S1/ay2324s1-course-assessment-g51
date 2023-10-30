import React from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import * as QuestionSlice from "../redux/reducers/Question/QuestionSlice"

// import components
import QuestionCreator from "./QuestionCreator";
import QuestionList from "./QuestionList";
import QuestionViewer from "./QuestionViewer";
import * as UserSlice from "../redux/reducers/User/UserSlice"
import { useSelector } from "react-redux/es/hooks/useSelector";

// import styles
import { questionPageContainerStyle } from "./styles";

import axios from 'axios';

const QuestionsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/api/questions`,
		})
			.then((response) => {
                const data = response.data;
                console.log(data);
                dispatch(QuestionSlice.initializeQuestionData(data));
			})
			.catch((error) => {
                console.log(error);
			});
	}, []);

    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    if (htmlElement && bodyElement) {
        // Apply the CSS styles
        htmlElement.style.padding = '0';
        htmlElement.style.margin = '0';
        bodyElement.style.padding = '0';
        bodyElement.style.margin = '0';
    }
    const isUserAnAdmin: boolean = useSelector(UserSlice.isUserAnAdmin);

    return (
        <div style={questionPageContainerStyle}>
            <QuestionList />
            {isUserAnAdmin ? <QuestionCreator /> : <QuestionViewer />}
        </div>
    )
}

export default QuestionsPage;
