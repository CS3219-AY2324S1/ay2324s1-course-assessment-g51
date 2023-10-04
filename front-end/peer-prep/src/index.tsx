import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { auth } from "./components/Auth/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// import Redux components here
import {Provider} from "react-redux";
import store from "./components/redux/store/store"

// import React Routing components here
import {
    BrowserRouter,
	Routes,
	Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

// import app components here
import QuestionsPage from './components/QuestionsPage';
import UserPage from './components/UserPage';

// import styles
import { appStyle } from './styles';
import ErrorPage from './components/ErrorPage';
import SignInPage from './components/Auth/SignInPage';

const ProtectedRoute = () => {
    const [user, loading, error] = useAuthState(auth);
    debugger;
	if (loading) {
        // the user object will be null if firebase is loading
        // handle loading next time
        return <></>
    }
    if (error) {          
        return <Navigate to="*"/>;
    }
    if (!user) {
        debugger;
       // User is not authenticated, navigate to SignIn page
        return <Navigate to="/signin" replace />;
    }
    return <Outlet/>
};


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <div id="app" style={appStyle}>
            <BrowserRouter>
                <Routes>
                    {/* All protected routes are written here */}
                    <Route element={<ProtectedRoute/>}>
                        <Route path="home" element={<QuestionsPage/>}/>
                        <Route path="user" element={<UserPage/>}/>
                    </Route>
                    {/* All non-protected routes are written here */}
                    <Route path="/" element={<SignInPage/>} />
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
