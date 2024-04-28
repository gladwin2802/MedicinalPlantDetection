import React, { useState } from 'react';
import Header from '../components/Header';
import "../assets/css/feedback.css"

function Feedback() {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted feedback:', comments);
        console.log('Rating:', rating);
        console.log('Uploaded file:', uploadedFile);
        setComments('');
        setRating(0);
        setUploadedFile(null);
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
            <Header />
            <div className="feedback-container">
                <div className="feedback-form shadow-lg bg-white rounded-md p-8 w-400 border border-gray-300 max-w-lg"> {/* Adjusted max-w-lg */}
                    <h1 className="feedback-title text-3xl font-bold mb-4">Feedback</h1>
                    <form onSubmit={handleSubmit} className="feedback-fields flex flex-col items-center">
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="feedback-textarea w-full h-40 p-4 border border-black rounded-md resize-none mb-4"
                            placeholder="Enter your feedback here..."
                        ></textarea>
                        <div className="feedback-upload flex items-center mb-4">
                            <label htmlFor="file-upload" className="feedback-upload-label mr-4 cursor-pointer text-blue-500 hover:underline">Upload Picture</label>
                            <input type="file" id="file-upload" onChange={handleFileUpload} className="hidden" />
                            {uploadedFile && <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded" className="feedback-preview w-20 h-20 object-cover border border-black ml-4" />}
                        </div>
                        <div className="feedback-rating flex mb-4">
                            {stars}
                        </div>
                        <button type="submit" className="feedback-submit px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit Feedback</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Feedback;
