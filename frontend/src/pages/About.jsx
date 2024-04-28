import React, { useState, useEffect } from 'react';
import '../assets/css/About.css';
import Header from '../components/Header';
import plantContent from '../assets/data/plantContent.js';
import { getImageURL } from '../utils/imageUtil.js';

function About() {
    const [pageIndex, setPageIndex] = useState(0);
    const [isTurningPage, setIsTurningPage] = useState(false);
    const [content, setContent] = useState({});

    useEffect(() => {
        setContent(plantContent[pageIndex]);
    }, [pageIndex]);

    const handleNextPage = () => {
        setIsTurningPage(true);
        setTimeout(() => {
            setPageIndex((prevIndex) => (prevIndex + 1) % plantContent.length);
            setIsTurningPage(false);
        }, 500); // Adjust timing based on your animation duration
    };

    const handlePreviousPage = () => {
        setIsTurningPage(true);
        setTimeout(() => {
            setPageIndex((prevIndex) => (prevIndex - 1 + plantContent.length) % plantContent.length);
            setIsTurningPage(false);
        }, 500); // Adjust timing based on your animation duration
    };

    return (
        <>
            <Header />
            <div className="about-container">
                <div className="navigation">
                    <button className="navigation-button" onClick={handlePreviousPage}>
                        Previous
                    </button>
                    <button className="navigation-button" onClick={handleNextPage}>
                        Next
                    </button>
                </div>

                <div className="book-container">
                    <div className={`book-page image-page ${isTurningPage ? 'page-turn-left' : ''}`}>
                        <img src={getImageURL(content.image)} alt={content.name} className="book-image" />
                    </div>
                    <div className={`book-page content-page ${isTurningPage ? 'page-turn-right' : ''}`}>
                        <h2 className="content-title">Medicinal Benefits of {content.name}</h2>
                        <ul className="content-list">
                            {content.properties && content.properties.map((property, index) => (
                                <li key={index} className="content-item">{property}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
