// Express backend

const express = require('express');
const app = express();

const imageRoutes = require('./routes/imageRoutes')
const userRoutes = require('./routes/userRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const mongoose = require('mongoose');
const cors = require('cors');
const feedback = require('./models/feedback');

// Middleware for handling json in req, res
app.use(express.json());

// Enable CORS for all routes
app.use(cors());
app.use('/api/upload/', imageRoutes)
app.use('/api/user/', userRoutes)
app.use('/api/feedback/', feedbackRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/imageUpload').then(() => {
    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    })
}
).catch((error) => {
    console.log("Failed to start server")
}
)

