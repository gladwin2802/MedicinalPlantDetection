const Feedback = require('../models/feedback');

const getFeedback = async (req, res) => {
    try {
        console.log(req.body.userId)
        console.log(req.body.comments)
        console.log(req.body.rating)
        const newFeedback = new Feedback({
            userId: req.body.userId,
            comments: req.body.comments,
            rating: req.body.rating,
            image: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : null
        });

        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getFeedback
}