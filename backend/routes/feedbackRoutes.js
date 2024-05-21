const express = require('express')

const { getFeedback } = require('../controllers/feedbackController')

const router = express.Router()

// require auth for all routes here
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

const multer = require('multer');
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), getFeedback);

module.exports = router;