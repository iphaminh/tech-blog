// Load environment variables
require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
  secret: 'your secret here', // This should be in an environment variable for security
  cookie:  {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);  // Make sure this line comes after `hbs` is defined
app.set('view engine', 'handlebars');
// Import the routes
// const homeRoutes = require('./controllers/homeRoutes');
// const dashboardRoutes = require('./controllers/dashboardRoutes');
// // ... any other routes you might have

// Use the routes
// app.use('/', homeRoutes);
// app.use('/dashboard', dashboardRoutes);
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
