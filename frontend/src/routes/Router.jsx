import React from 'react';
import { createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Predict from '../pages/Predict';
import StoreMap from '../pages/StoreMap';
import QuizPage from '../pages/QuizPage';
import About from "../pages/About";
import Feedback from '../pages/feedback';
import Test from '../pages/Test';

const router = createBrowserRouter([
    {
        path: "test",
        element: <Test />
    },
    {
        path: "/",
        element: <App />
    },
    {
        path: "predict",
        element: <Predict />
    },
    {
        path: "map",
        element: <StoreMap />
    },
    {
        path: "quiz",
        element: <QuizPage />
    },
    {
        path: "about",
        element: <About />
    },
    {
        path: "feedback",
        element: <Feedback/>
    }
]);

export default router;