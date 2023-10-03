import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// import Redux components here
import {Provider} from "react-redux";
import store from "./components/redux/store/store"

// import React Routing components here
import {
    BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

// import app components here
import QuestionsPage from './components/QuestionsPage';
import UserPage from './components/UserPage';

// import styles
import { appStyle } from './styles';
import ErrorPage from './components/ErrorPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <div id="app" style={appStyle}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionsPage/>}/>
          <Route path="/home" element={<QuestionsPage/>}/>
          <Route path="/settings" element={<UserPage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
