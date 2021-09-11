const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // columns will go here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // define a COMMENT TITKE  column
    post_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
      // define a COMMNET BOX column
    post_content: {
        type: DataTypes.STRING,
        allowNull: false
      },
     
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Post;