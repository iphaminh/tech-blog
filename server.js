const sequelize = require('./config/connection');

// ... other server setup code ...

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// ... rest of your server code ...
