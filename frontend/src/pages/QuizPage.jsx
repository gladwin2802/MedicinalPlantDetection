import React, { useState, useEffect } from 'react';
import Quiz from 'react-quiz-component';
import questionsEnglish from '../assets/data/questionsEnglish';
import questionsTamil from '../assets/data/questionsTamil';
import '../assets/css/QuizPage.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const QuizComponent = () => {
    const [language, setLanguage] = useState('english');
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [key, setKey] = useState(0); // Used to force re-render

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const startQuiz = () => {
        if (!quizStarted) {
            console.log("Quiz started...")
            setQuizStarted(true);
            setQuizCompleted(false);
        }
    };

    const handleQuizComplete = () => {
        console.log("Quiz completed...")
        setQuizStarted(false);
        setQuizCompleted(true);
    };

    const retakeQuiz = () => {
        setQuizStarted(false);
        setQuizCompleted(false);
        setKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        // startQuiz()
        const startButton = document.querySelector('.startQuizBtn');
        if (startButton) {
            startButton.addEventListener('click', startQuiz);
        }
        return () => {
            if (startButton) {
                startButton.removeEventListener('click', startQuiz);
            }
        };
    }, []);

    return (
        <>
            <Navbar />
            <Header />
            <center>
                {quizCompleted && (
                    <div>
                        <h2>Quiz Completed!</h2>
                        <div className="btn" onClick={retakeQuiz}>Retake Quiz</div>
                    </div>
                )}
                {!quizStarted && !quizCompleted && (
                    <div className="language-select-container">
                        <h2>Choose language: </h2>
                        <select id="language-select" value={language} onChange={handleLanguageChange}>
                            <option value="english">English</option>
                            <option value="tamil">தமிழ்</option>
                        </select>
                    </div>
                )}
                <br />
                <div className="quiz-container" onClick={startQuiz} key={key}>
                    {language === 'english' && (
                        <Quiz
                            quiz={questionsEnglish}
                            shuffle={true}
                            shuffleAnswers={true}
                            timer={90}
                            onComplete={handleQuizComplete}
                        />
                    )}
                    {language === 'tamil' && (
                        <Quiz
                            quiz={questionsTamil}
                            shuffle={true}
                            shuffleAnswers={true}
                            timer={90}
                            onFocus={startQuiz}
                            onComplete={handleQuizComplete}
                        />
                    )}
                </div>

            </center>
        </>
    );
};

export default QuizComponent;