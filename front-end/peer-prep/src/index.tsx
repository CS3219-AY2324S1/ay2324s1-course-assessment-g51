import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// import React Routing components here
import {
  BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

// import app components here
import HomePage from './components/homePage';
import QuestionsPage from './components/QuestionsPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div id="app" style={{}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionsPage/>}/>
        <Route path="/home" element={<QuestionsPage/>}/>
      </Routes>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
