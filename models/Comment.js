const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        // columns will go here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        // define a COMMENT TITKE  column
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false
        },   
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },  
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                  model: 'post',
                  key: 'id'
                }
            }
        
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;