const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


// GET route to display the user's dashboard with their posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Fetch posts for the logged-in user
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['username'] }]
        });

        // Convert Sequelize objects into plain JavaScript objects
        const posts = postData.map(post => post.get({ plain: true }));

        // Render the dashboard template with the user's posts
        res.render('dashboard', { 
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT route to update a post by its ID
router.put('/dashboard/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to remove a post by its ID
router.delete('/dashboard/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
