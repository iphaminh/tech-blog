const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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

  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  
// ... rest of your server code ...
