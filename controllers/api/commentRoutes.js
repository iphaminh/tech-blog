// Import necessary packages and models
const router = require('express').Router();
const { Comment } = require('../../models');

// Route to get all comments
router.get('/', async (req, res) => {
    try {
        // Find all comments in the database
        const commentData = await Comment.findAll();
        
        // Send a 200 status code along with the comments data
        res.status(200).json(commentData);
    } catch (err) {
        // If there's an error, send a 500 status code with the error
        res.status(500).json(err);
    }
});

// Route to create a new comment
router.post('/', async (req, res) => {
    try {
        // Create a new comment using the request body
        const commentData = await Comment.create(req.body);
        
        // Send a 200 status code along with the comment data
        res.status(200).json(commentData);
    } catch (err) {
        // If there's an error, send a 400 status code with the error
        res.status(400).json(err);
    }
});

// Delete a comment by its `id` value
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Export the router for use in other parts of the app
module.exports = router;
