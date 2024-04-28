import React, { useState } from 'react';
import axiosNode from '../config/axiosNode';
import axiosPy from '../config/axiosPy';
import Header from '../components/Header';
import '../assets/css/Predict.css';

function Predict() {
    const [dropImage, setDropImage] = useState("https://cdn-icons-png.flaticon.com/512/4904/4904233.png")
    const [file, setFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log('Selected file:', selectedFile);
        setFile(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setDropImage(imageUrl);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const predictionData = await getPrediction(formData);
            formData.append('prediction', JSON.stringify(predictionData));
            const response = await axiosNode.post('/api/upload', formData);
            console.log('Image uploaded successfully:', response.data);
            const imageId = response.data;
            try {
                const imageResponse = await axiosNode.get(`/api/image/${imageId}`);
                const imageBuffer = new Uint8Array(imageResponse.data.data.data);
                const blob = new Blob([imageBuffer], { type: imageResponse.data.contentType });
                const imageUrl = URL.createObjectURL(blob);
                setUploadedImage(imageUrl);
                setPrediction(JSON.stringify(imageResponse.data.prediction.result.class));
            } catch (error) {
                console.error('Error retrieving image:', error);
            }

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const getPrediction = async (file) => {
        const response = await axiosPy.post('/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response);
        return response.data;
    };

    return (
        <div>
            <Header></Header>
            <div className="main">
                <div className='dim upload-box'>
                    <div className='in-upload'>
                        <img className='img' src={dropImage} width={"100px"} height={"100px"} />
                        <input type="file" className="input-file" onChange={handleFileChange} />
                        <div className="text-f top-m">Drag your file, or browse</div>
                    </div>
                    <button className="btn" onClick={handleSubmit}>Upload Image</button>
                </div>
                {uploadedImage && (
                    <div className='dim pad-'>
                        <h2>Uploaded Image:</h2>
                        <img src={uploadedImage} alt="Uploaded" width={"100%"} height={"100%"} />
                        {prediction && (
                            <>
                                <h2>Predictions</h2>
                                <p>{prediction}</p>
                            </>)
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default Predict;