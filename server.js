// Load environment variables
require('dotenv').config();

// Import necessary modules
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');  // Only import sequelize from models
const exphbs = require('express-handlebars').engine;
const session = require('express-session'); // For session management
const SequelizeStore = require('connect-session-sequelize')(session.Store); // For storing sessions in the database

// Initialize the Express app
const app = express();

// Define the PORT, either from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Set up Handlebars as the templating engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET, // Loaded from environment variable
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Use the session middleware
app.use(session(sess));

// Import the routes
const homeRoutes = require('./controllers/homeRoutes');
const dashboardRoutes = require('./controllers/dashboardRoutes');
// ... any other routes you might have

// Use the routes
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
// ... any other app.use() statements for other routes

// Authenticate with the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server and sync the models with the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});

app.get('/', async (req, res) => {
  try {
      // Fetch posts from the database
      const postData = await Post.findAll();
      const posts = postData.map(post => post.get({ plain: true }));

      // Render the homepage template with the posts data
      res.render('home', { posts });
  } catch (err) {
      res.status(500).json(err);
  }
});

app.get('/', (req, res) => {
  const posts = [{title: "Test Post", content: "This is a test post."}];
  res.render('home', { posts });
});
