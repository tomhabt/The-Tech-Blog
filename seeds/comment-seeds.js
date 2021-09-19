const { Comment } = require('../models');

const commentData = [
  {
    comment_text:"Five star for Bootcamp program",
     post_id: 1
 }
  
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
