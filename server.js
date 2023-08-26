const sequelize = require('./config/connection');

// ... other server setup code ...

sequelize.sync({ force: false }).then(() => { //option ensures that the tables are not recreated if they already exist. If you set it to true, it will drop and recreate the tables every time you start the server.
  app.listen(PORT, () => console.log('Now listening'));
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// ... rest of your server code ...
