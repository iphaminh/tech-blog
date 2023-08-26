const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model
class Post extends Model {}

Post.init(
  {
    // Define an ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a title column for the blog post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the content of the blog post
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define a foreign key for the user who created the post
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // We want timestamps for posts
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Define the relationship between Post and User
Post.belongsTo(User, {
  foreignKey: 'user_id', //post still there if user got deleted
});

// Define the relationship between Post and Comment
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE' // post got deleted>>> comments got deleted it too
});


module.exports = Post;
