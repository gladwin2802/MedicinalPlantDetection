const express = require('express')

const {
    uploadImage,
    getUploadedImage,
    getAllUserImages,
    deleteAllImages
} = require('../controllers/imageController')

const router = express.Router()

// require auth for all routes here
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

const multer = require('multer');
const upload = multer({ dest: '../backend/uploads/' });

// Insert the image into database, with prediction value
router.post('/', upload.single('image'), uploadImage);

// Get the image and prediction from the database
router.get('/:id', getUploadedImage)

// Get the image and prediction from the database
router.get('/all/:id', getAllUserImages)

// Delete all images from the database
router.get('/deleteAll', deleteAllImages);

module.exports = router;