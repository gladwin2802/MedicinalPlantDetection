import React, { useEffect, useState } from 'react';
import axiosNode from '../config/axiosNode';
import axiosPy from '../config/axiosPy';
import Header from '../components/Header';
import '../assets/css/Predict.css';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useAuthContext } from '../hooks/useAuthContext';
// import { useNavigate } from 'react-router-dom';

function Predict() {
    const [dropImage, setDropImage] = useState("https://cdn-icons-png.flaticon.com/512/4904/4904233.png")
    const [file, setFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [prediction, setPrediction] = useState('');
    const { user, userId } = useAuthContext()
    const [images, setImages] = useState(null);

    const fetchUserImages = async () => {
        try {
            const response = await axiosNode.get(`/api/upload/all/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching user images:', error);
        }
    };

    useEffect(() => {
        console.log(images)
    }, [images])

    // const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetchUserImages();
            console.log(images);
        }
    }, [userId]);
    // useEffect(() => {
    //     if (userId) {
    //         fetchUserImages();
    //         console.log(images)
    //     }
    //     else {
    //         window.location.href = '/predict';
    //     }
    // }, [userId])

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
            formData.append('prediction', predictionData.result.class);
            formData.append('user_id', userId);
            const response = await axiosNode.post('/api/upload/', formData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            console.log('Image uploaded successfully:', response.data);
            const imageId = response.data;
            try {
                const imageResponse = await axiosNode.get(`/api/upload/${imageId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                console.log(imageResponse);
                const imageBuffer = new Uint8Array(imageResponse.data.data.data);
                const blob = new Blob([imageBuffer], { type: imageResponse.data.contentType });
                const imageUrl = URL.createObjectURL(blob);
                setUploadedImage(imageUrl);
                setPrediction(JSON.stringify(imageResponse.data.prediction));
                fetchUserImages();
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
        console.log("By PyBackend : ", response);
        return response.data;
    };

    const genImage = (image) => {
        const imageBuffer = new Uint8Array(image.data.data);
        const blob = new Blob([imageBuffer], { type: image.contentType });
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl
    }

    return (
        <div>
            <Navbar />
            <Header />
            <br />
            <div className='container' style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "start", padding: "40px", gap: "10px", paddingTop: "0px" }}>
                {userId && images && <div className="records" style={{ flex: 1 }}>
                    <h1>History</h1>
                    <div className="cards-container" style={{ display: 'flex', flexDirection: "row", justifyContent: "start", alignItems: "start" }}>
                        {images.map((image, index) => (
                            image.prediction != "Invalid image" &&
                            <Card
                                key={index}
                                imageUrl={genImage(image)}
                                prediction={image.prediction}
                            />
                        ))}
                    </div>
                </div>}
                <div className="main" style={{ flex: 0.4, alignSelf: "start" }}>
                    <h1 style={{ alignSelf: 'center' }}>Upload Image to know plant</h1>
                    <div className='dim upload-box'>
                        <div className='in-upload' style={{ cursor: "pointer" }}>
                            <img className='img' src={dropImage} width={"100px"} height={"100px"} style={{ cursor: "pointer" }} />
                            <input type="file" accept="image/*" className="input-file" onChange={handleFileChange} style={{ cursor: "pointer" }} />
                            <div className="text-f top-m" style={{ cursor: "pointer" }}>Drag your file, or browse</div>
                        </div>
                        <button className="btn" onClick={handleSubmit}>Submit</button>
                    </div>
                    <br />
                    {uploadedImage && (
                        <div className='dim pad-'>
                            <h2>Uploaded Image:</h2>
                            <img src={uploadedImage} alt="Uploaded" width={"100%"} height={"100%"} />
                            {prediction != '"Invalid image"' && (
                                <>
                                    <h2>Found as</h2>
                                    <p>{prediction}</p>
                                </>)
                            }
                            {prediction == '"Invalid image"' && (
                                <>
                                    <p style={{ "color": "red", "textAlign": "center" }}>Uploaded image is invalid !</p>
                                    <p style={{ "color": "red", "textAlign": "center" }}>Kindly upload a zoomed in leaf image !</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Predict;