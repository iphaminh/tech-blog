// Middleware to check if the user is logged in
function withAuth(req, res, next) {
    // If the user is not logged in, redirect them to the login page
    if (!req.session.logged_in) {
        return res.redirect('/login');
    }

    // If the user is logged in, proceed to the next middleware or route handler
    next();
}

module.exports = withAuth;
