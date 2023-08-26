const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        res.render('homepage', { posts: postData });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
