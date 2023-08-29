const router = require('express').Router();
const { Post, User } = require('../models');

// Route for the homepage to display all posts
router.get('/', async (req, res) => {
    try {
        console.log("Fetching posts for homepage..."); // <-- Add this line
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });
        console.log(postData);
        res.render('homepage', { posts: postData });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route to view a single post based on its ID
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        // Render the singlepost template with the post data
        res.render('singlepost', { post: postData });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/test', (req, res) => {
    res.send('Test route works!');
});


module.exports = router;
