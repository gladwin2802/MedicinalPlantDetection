import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import App from '../App';
import Predict from '../pages/Predict';
import StoreMap from '../pages/StoreMap';
import QuizPage from '../pages/QuizPage';
import About from '../pages/About';
import Feedback from '../pages/feedback';
import Test from '../pages/Test';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const AppRouter = () => {
    const { user } = useAuthContext();

    const routes = createBrowserRouter([
        {
            path: "test",
            element: user ? <Test /> : <Navigate to="/login" />
        },
        {
            path: "login",
            element: !user ? <Login /> : <Navigate to="/" />
        },
        {
            path: "signup",
            element: <Signup />
        },
        {
            path: "/",
            element: user ? <App /> : <Navigate to="/login" />
        },
        {
            path: "predict",
            element: user ? <Predict /> : <Navigate to="/login" />
        },
        {
            path: "map",
            element: user ? <StoreMap /> : <Navigate to="/login" />
        },
        {
            path: "quiz",
            element: user ? <QuizPage /> : <Navigate to="/login" />
        },
        {
            path: "about",
            element: user ? <About /> : <Navigate to="/login" />
        },
        {
            path: "feedback",
            element: user ? <Feedback /> : <Navigate to="/login" />
        }
    ]);

    return <RouterProvider router={routes} />;
};

export default AppRouter;