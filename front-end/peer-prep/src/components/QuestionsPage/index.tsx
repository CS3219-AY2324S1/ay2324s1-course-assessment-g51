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

import { auth } from "../Auth/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const QuestionsPage = () => {
    const dispatch = useDispatch();
    const [user, loading, error] = useAuthState(auth);

	const currentUserUid = user?.uid;

    const getIsAdmin = () => {
        axios({
          method: "get",
          url: `https://api.peerprepgroup51sem1y2023.xyz/users/admin/${currentUserUid}`,
        })
          .then((response) => {
            const data = response.data.data;
            dispatch(UserSlice.updateIsAdmin(data));
          })
          .catch(() => {
          });
    };

    useEffect(() => {
        getIsAdmin();
		axios({
			method: "get",
			url: `https://api.peerprepgroup51sem1y2023.xyz/api/questions`,
		})
			.then((response) => {
                const data = response.data;
                dispatch(QuestionSlice.initializeQuestionData(data));
			})
			.catch(() => {
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
