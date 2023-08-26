const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');

const app = express();

// Define the PORT
const PORT = process.env.PORT || 3001;

// Set up Handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ... other middleware and configurations ...

// Authenticate with the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});

// ... rest of your server code ...
