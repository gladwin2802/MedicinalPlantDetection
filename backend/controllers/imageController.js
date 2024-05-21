const Image = require('../models/image')
const fs = require('fs');

const uploadImage = async (req, res) => {
    try {
        console.log(req.body.prediction)
        const image = new Image({
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype,
            prediction: req.body.prediction, // Assign the parsed prediction object to the prediction field
            userId: req.body.user_id
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
}

const getUploadedImage = async (req, res) => {
    try {
        console.log(req.params.id)
        const image = await Image.findById(req.params.id);
        console.log(image)
        if (!image) {
            return res.status(404).send('Image not found');
        }
        // Send image and prediction as JSON
        res.json({
            data: image.data,
            contentType: image.contentType,
            prediction: image.prediction,
            user_id: image.userId
        });
    } catch (error) {
        console.log(req.params.id)
        console.error('Error retrieving image:', error);
        res.status(500).send('Error retrieving image');
    }
}

const getAllUserImages = async (req, res) => {
    const userId = req.params.id;
    try {
        const images = await Image.find({ userId: userId });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch images' });
    }
}

const deleteAllImages = async (req, res) => {
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
}

module.exports = {
    uploadImage,
    getUploadedImage,
    getAllUserImages,
    deleteAllImages
}