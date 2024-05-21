import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../assets/css/QuizPage.css';
import questionsData from '../assets/data/question.json';

const QuizPage = () => {
    const time = 60; // metrics in seconds
    const [language, setLanguage] = useState('english');
    const [questions, setQuestions] = useState(questionsData);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [unansweredCount, setUnansweredCount] = useState(0);
    const [timer, setTimer] = useState(time);
    const [timerRunning, setTimerRunning] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerRunning && timer > 0) {
                setTimer((prevTimer) => prevTimer - 1);
            } else if (timer === 0) {
                setTimerRunning(false);
                handleNextQuestion();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timerRunning, timer]);

    const toggleLanguage = () => {
        setLanguage(language === 'english' ? 'tamil' : 'english');
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[language][currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
            setCorrectCount(correctCount + 1);
        } else if (selectedOption === null) {
            setUnansweredCount(unansweredCount + 1);
        } else {
            setIncorrectCount(incorrectCount + 1);
        }

        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setTimer(time);
        setTimerRunning(true);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setSelectedOption(null);
        setTimer(time);
        setTimerRunning(true);
    };

    return (
        <>
            <Header />
            <div className="quiz-container background">
                <div className="language-toggle">
                    <button onClick={toggleLanguage} className="language-text">{language === 'english' ? 'English' : 'Tamil'}</button>
                </div>
                <h2 className="timer-text">Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</h2>
                <div className="center-content">
                    {currentQuestionIndex < questions[language].length ? (
                        <>
                            <div className="question-container">
                                <h1>Question {currentQuestionIndex + 1}</h1>
                                <h2 className="question-text">{questions[language][currentQuestionIndex].question}</h2>
                                <ul className="options-container">
                                    {questions[language][currentQuestionIndex].options.map((option, index) => (
                                        <li key={index} className="option-item">
                                            <button
                                                className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                                                onClick={() => handleOptionSelect(option)}
                                            >
                                                {option}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="button-container">
                                    <div style={{ "width": "200px" }}></div>
                                    {/* <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  >
                  Previous
                </button> */}
                                    <button onClick={handleNextQuestion}>Next</button>
                                    {/* {selectedOption && (
                  <button onClick={handleNextQuestion}>Next</button>
                )} */}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="result-container">
                            <h1>Quiz Completed!</h1>
                            <div className="result-box">
                                <div className="result-button">
                                    <p>Correct: {correctCount}</p>
                                    <button onClick={() => console.log("Correct Answers")}>View</button>
                                </div>
                                <div className="result-button">
                                    <p>Incorrect: {incorrectCount}</p>
                                    <button onClick={() => console.log("Incorrect Answers")}>View</button>
                                </div>
                                <div className="result-button">
                                    <p>Not Answered: {unansweredCount}</p>
                                    <button onClick={() => console.log("Not Answered")}>View</button>
                                </div>
                            </div>
                            <p>Your Score: {score} / {questions[language].length}</p>
                            <Link to="/" className="link">Return to Home</Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default QuizPage;
