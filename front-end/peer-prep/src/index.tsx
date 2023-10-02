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
} from "react-router-dom";

// import app components here
import QuestionsPage from './components/QuestionsPage';

// import styles
import { appStyle } from './styles';
import ErrorPage from './components/ErrorPage';
import SignInPage from './components/Auth/SignInPage';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const [user, loading, error] = useAuthState(auth);
	if (loading) {
        // Show loading screen
        // return <LoadingComponent />;
      }
    
      if (user) {
        // User is authenticated, render children or Outlet
        return children ? <>{children}</> : <Outlet />;
      }
    
      if (error) {          
        // Handle error condition
        //return <ErrorComponent error={error} />;
        return <Navigate to="*" replace={true} />;
      }
    
      // User is not authenticated, navigate to SignIn page
      return <Navigate to="/SignIn" replace={true} />;
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
                    <Route element={<ProtectedRoute children={null}/>}>
                        <Route path="/" element={<QuestionsPage/>}/>
                        <Route path="/home" element={<QuestionsPage/>}/>
                    </Route>
                    {/* All non-protected routes are written here */}
                    <Route path="SignIn" element={<SignInPage/>} />
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
