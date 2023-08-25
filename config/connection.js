const Sequelize = require('sequelize');
require('dotenv').config();

// Create a Sequelize connection to the database using the URL in .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: '127.0.0.1',  // Explicitly set host to IPv4 address
    dialect: 'mysql',
    port: 3306
});


module.exports = sequelize;
