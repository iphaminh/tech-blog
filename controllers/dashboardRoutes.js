router.get('/dashboard', async (req, res) => {
    try {
        // Fetch posts for the logged-in user
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['username'] }]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('dashboard', { 
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
