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
    user_id:{
      type: DataTypes.INTEGER,
      references: {
      model: 'user',
      key: 'id'
      }
    }    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;