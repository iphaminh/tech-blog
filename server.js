// Import necessary modules
const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars').engine;
const session = require('express-session'); // For session management
const SequelizeStore = require('connect-session-sequelize')(session.Store); // For storing sessions in the database


// Initialize the Express app
const app = express();

// Define the PORT, either from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Set up Handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Session configuration
const sess = {
  secret: 'your secret here', // This should be in an environment variable for security
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Use the session middleware
app.use(session(sess));

// TODO: Import and use your routes here
// Example:
// const apiRoutes = require('./routes/apiRoutes');
// app.use('/api', apiRoutes);

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

// Define a route for the root URL
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});
app.get('/', (req, res) => {
  console.log("Root route accessed");
  res.render('/homepage', (err, html) => {
    if (err) {
      console.error("Error rendering:", err);
      res.status(500).send("Error rendering homepage");
    } else {
      res.send(html);
    }
  });
});

