const Sequelize = require('sequelize');
require('dotenv').config();

// Create a Sequelize connection to the database using the URL in .env
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
