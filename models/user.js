const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


// Define the User model
class User extends Model {
  // Method to check password validity
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // Define an ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
    },
    // Define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Password should be at least 8 characters long
      },
    },
  },
  {
    hooks: {
      // Before saving a new user, hash their password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Before updating a user, hash their password
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },

    },
    sequelize,
    timestamps: false, //Without timestamps: false, Sequelize will automatically add createdAt and updatedAt columns to your table.
    freezeTableName: true, // Sequelize will pluralize the table name based on the model name.
    underscored: true, //Sequelize will use camelCase for automatically generated fields.
    modelName: 'user', // is more for internal reference and clarity, but it's good practice to include it.
  }
);

  

module.exports = User;
