import React, { useState } from 'react';
import Header from '../components/Header';
import "../assets/css/feedback.css";
import Navbar from '../components/Navbar';
import axiosNode from '../config/axiosNode';
import { useAuthContext } from '../hooks/useAuthContext';

function Feedback() {
    const { user, userId } = useAuthContext()

    const [comments, setComments] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [rating, setRating] = useState(null);
    const [selectedStars, setSelectedStars] = useState(0);
    const [hoveredStars, setHoveredStars] = useState(0);

    const handleMouseEnter = (index) => {
        setHoveredStars(index + 1);
    };

    const handleMouseLeave = () => {
        setHoveredStars(0);
    };

    const handleClick = (index) => {
        setSelectedStars(index + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('comments', comments);
        formData.append('rating', selectedStars);
        formData.append('userId', userId);
        if (uploadedFile) {
            formData.append('file', uploadedFile);
        }
        console.log(comments)
        console.log(selectedStars)
        console.log(userId)
        try {
            const response = await axiosNode.post('/api/feedback/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.token}`
                },
            });
            console.log('Submitted feedback:', response.data);
            setComments('');
            setRating(0);
            setUploadedFile(null);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setUploadedFile(file);
    };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                className={`star-rating ${i <= rating ? 'active' : 'inactive'} hover:active`}
                onClick={() => setRating(i)}
            >
                &#9733;
            </span>
        );
    }

    return (
        <>
            <Navbar />
            <Header />
            <br />
            <div className="feedback-container">
                <div className="feedback-form">
                    <h1 className="feedback-title">Feedback</h1>
                    <form onSubmit={handleSubmit} className="feedback-fields">
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="feedback-textarea"
                            placeholder="Enter your feedback here..."
                        ></textarea>
                        <div><p>For any sample, if you can provide image...</p></div>
                        <div className="feedback-upload">
                            <input type="file" id="file-upload" onChange={handleFileUpload} className="hidden" />
                            <label htmlFor="file-upload" className="upload-button">
                                Upload File
                            </label>
                        </div>
                        {uploadedFile && <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded" className="feedback-preview" />}
                        <br />
                        <label className="feedback-upload-label">Give ratings</label>
                        <div className="feedback-rating">
                            {stars.map((_, index) => (
                                <span
                                    key={index}
                                    className={`star ${index < selectedStars || index < hoveredStars
                                        ? 'selected'
                                        : ''
                                        }`}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(index)}
                                >
                                    ★
                                </span>
                            ))}
                        </div><br />
                        <button type="submit" className="feedback-submit">Submit Feedback</button>
                    </form>
                </div>
            </div>
            <br />
        </>
    );
}

export default Feedback;
