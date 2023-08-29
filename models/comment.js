const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const Post = require('./post');

// Define the Comment model
class Comment extends Model {}

Comment.init(
  {
    // Define an ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the comment content
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define a foreign key for the user who made the comment
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Define a foreign key for the post the comment belongs to
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // We want timestamps for comments
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

// Define the relationship between Comment and User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// Define the relationship between Comment and Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = Comment;
