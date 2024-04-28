// Express backend

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });
// Enable CORS for all routes
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/imageUpload');

const ImageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    prediction: Object
});

const Image = mongoose.model('Image', ImageSchema);

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const prediction = JSON.parse(req.body.prediction); // Parse prediction data string into an object
        console.log(prediction)
        const image = new Image({
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype,
            prediction: prediction // Assign the parsed prediction object to the prediction field
        });
        await image.save();

        // Remove the uploaded file from the uploads folder
        fs.unlinkSync(req.file.path);

        // Send the ID of the uploaded image in the response
        res.send(image._id);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image');
    }
});


app.get('/api/image/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        // Send image and prediction as JSON
        res.json({
            data: image.data,
            contentType: image.contentType,
            prediction: image.prediction
        });
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).send('Error retrieving image');
    }
});

app.get('/api/deleteAll', async (req, res) => {
    try {
        // Delete all documents in the collection
        const result = await Image.deleteMany({});
        
        if (result.deletedCount > 0) {
            return res.status(200).send('All documents deleted successfully');
        } else {
            return res.status(200).send('No documents found to delete');
        }
    } catch (error) {
        console.error('Error deleting documents:', error);
        res.status(500).send('Error deleting documents');
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
