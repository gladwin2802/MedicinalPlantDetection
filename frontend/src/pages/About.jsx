import React, { useState, useEffect, useRef } from 'react';
import FlipPage from 'react-flip-page';
import '../assets/css/About.css';
import Header from '../components/Header';
import plantContent from '../assets/data/plantContent.js';
import { getImageURL } from '../utils/imageUtil.js';
import Navbar from '../components/Navbar.jsx';

function About() {
    const [pageIndex, setPageIndex] = useState(0);
    const flipPageRef = useRef(null);

    const handleNextPage = () => {
        setPageIndex((prevIndex) => (prevIndex + 1) % plantContent.length);
    };

    const handlePreviousPage = () => {
        setPageIndex((prevIndex) => (prevIndex - 1 + plantContent.length) % plantContent.length);
    };

    useEffect(() => {
        if (flipPageRef.current) {
            flipPageRef.current.gotoPage(pageIndex);
        }
    }, [pageIndex]);

    return (
        <>
            <Navbar />
            <Header />
            <center>
                <h1>Know your plants !!!</h1>
            </center>

            <div className="about-container">
                <FlipPage
                    className="book-container"
                    orientation="horizontal"
                    flipOnTouch
                    showSwipeHint
                    width={1300}
                    height={600}
                    ref={flipPageRef}
                >
                    {plantContent.map((content, index) => (
                        <article key={index} className="page">
                            <div className="page-left">
                                <img src={getImageURL(content.image)} alt={content.name} className="book-image" />
                            </div>
                            <div className="page-right">
                                <div className='page-right-border'>
                                    <h2 className="content-title">Medicinal Benefits of {content.name}</h2>
                                    <ul className="content-list">
                                        {content.properties && content.properties.map((property, i) => (
                                            <li key={i} className="content-item">{property}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    ))}
                </FlipPage>
                <br />
                <div className="navigation">
                    <button className="navigation-button" onClick={handlePreviousPage}>
                        Previous
                    </button>
                    <button className="navigation-button" onClick={handleNextPage}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default About;


// v2

// import React, { useState, useEffect, useRef } from 'react';
// import FlipPage from 'react-flip-page';
// import '../assets/css/About.css';
// import Header from '../components/Header';
// import plantContent from '../assets/data/plantContent.js';
// import { getImageURL } from '../utils/imageUtil.js';
// import Navbar from '../components/Navbar.jsx';

// function About() {
//     const [pageIndex, setPageIndex] = useState(0);
//     const flipPageRef = useRef(null);

//     const handleNextPage = () => {
//         if (pageIndex < plantContent.length - 1) {
//             setPageIndex(pageIndex + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (pageIndex > 0) {
//             setPageIndex(pageIndex - 1);
//         }
//     };

//     useEffect(() => {
//         if (flipPageRef.current) {
//             flipPageRef.current.gotoPage(pageIndex);
//         }
//     }, [pageIndex]);

//     return (
//         <>
//             <Navbar />
//             <Header />
//             <div className="about-container">
//                 <FlipPage
//                     className="book-container"
//                     orientation="horizontal"
//                     flipOnTouch
//                     showSwipeHint
//                     width={1500}
//                     height={600}
//                     ref={flipPageRef}
//                 >
//                     {plantContent.map((content, index) => (
//                         <article key={index} className="page">
//                             <div className="page-left">
//                                 <img src={getImageURL(content.image)} alt={content.name} className="book-image" />
//                             </div>
//                             <div className="page-right">
//                                 <h2 className="content-title">Medicinal Benefits of {content.name}</h2>
//                                 <ul className="content-list">
//                                     {content.properties && content.properties.map((property, i) => (
//                                         <li key={i} className="content-item">{property}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </article>
//                     ))}
//                 </FlipPage>
//                 <div className="navigation">
//                     <button className="navigation-button" onClick={handlePreviousPage}>
//                         Previous
//                     </button>
//                     <button className="navigation-button" onClick={handleNextPage}>
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default About;



// v1

// import React, { useState, useEffect } from 'react';
// import '../assets/css/About.css';
// import Header from '../components/Header';
// import plantContent from '../assets/data/plantContent.js';
// import { getImageURL } from '../utils/imageUtil.js';
// import Navbar from '../components/Navbar.jsx';

// function About() {
//     const [pageIndex, setPageIndex] = useState(0);
//     const [isTurningPage, setIsTurningPage] = useState(false);
//     const [content, setContent] = useState({});

//     useEffect(() => {
//         setContent(plantContent[pageIndex]);
//     }, [pageIndex]);

//     const handleNextPage = () => {
//         setIsTurningPage(true);
//         setTimeout(() => {
//             setPageIndex((prevIndex) => (prevIndex + 1) % plantContent.length);
//             setIsTurningPage(false);
//         }, 500); // Adjust timing based on your animation duration
//     };

//     const handlePreviousPage = () => {
//         setIsTurningPage(true);
//         setTimeout(() => {
//             setPageIndex((prevIndex) => (prevIndex - 1 + plantContent.length) % plantContent.length);
//             setIsTurningPage(false);
//         }, 500); // Adjust timing based on your animation duration
//     };

//     return (
//         <>
//             <Navbar />
//             <Header />
//             <div className="about-container">
//                 <div className="navigation">
//                     <button className="navigation-button" onClick={handlePreviousPage}>
//                         Previous
//                     </button>
//                     <button className="navigation-button" onClick={handleNextPage}>
//                         Next
//                     </button>
//                 </div>

//                 <div className="book-container">
//                     <div className={`book-page image-page ${isTurningPage ? 'page-turn-left' : ''}`}>
//                         <img src={getImageURL(content.image)} alt={content.name} className="book-image" />
//                     </div>
//                     <div className={`book-page content-page ${isTurningPage ? 'page-turn-right' : ''}`}>
//                         <h2 className="content-title">Medicinal Benefits of {content.name}</h2>
//                         <ul className="content-list">
//                             {content.properties && content.properties.map((property, index) => (
//                                 <li key={index} className="content-item">{property}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default About;
