// Importing necessary modules
const router = require('express').Router(); // This sets up the router using Express.
const { User } = require('../../models');   // This imports the User model from the models directory.

// Render the login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Render the signup page
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        // Attempt to create a new user with the data sent in the request body.
        const userData = await User.create(req.body);

        // If user creation is successful, save the user's ID and logged-in status to the session.
        req.session.save(() => {
            req.session.user_id = userData.id;       // Save user ID to session.
            req.session.logged_in = true;            // Mark the user as logged in.
            res.status(200).json(userData);          // Send a 200 status code along with the user data.
        });
    } catch (err) {
        // If there's an error, send a 400 status code along with the error.
        res.status(400).json(err);
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        // Attempt to find a user with the provided username.
        const userData = await User.findOne({ where: { username: req.body.username } });

        // If the user is not found, send an error message.
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password' });
            return;
        }

        // Check if the provided password matches the user's password.
        const validPassword = await userData.checkPassword(req.body.password);

        // If the password doesn't match, send an error message.
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password' });
            return;
        }

        // If login is successful, save the user's ID and logged-in status to the session.
        req.session.save(() => {
            req.session.user_id = userData.id;       // Save user ID to session.
            req.session.logged_in = true;            // Mark the user as logged in.
            res.json({ user: userData, message: 'You are now logged in!' }); // Send a success message.
        });
    } catch (err) {
        // If there's an error, send a 400 status code along with the error.
        res.status(400).json(err);
    }
});

// Logout route
router.post('/logout', (req, res) => {
    // Check if the user is currently logged in.
    if (req.session.logged_in) {
        // If the user is logged in, destroy the session to log them out.
        req.session.destroy(() => {
            res.status(204).end(); // Send a 204 status code, indicating successful logout.
        });
    } else {
        // If the user is not logged in, send a 404 status code.
        res.status(404).end();
    }
});

// Export the router to be used in other parts of the application.
module.exports = router;
