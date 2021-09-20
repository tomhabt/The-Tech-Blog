const { Comment } = require('../models');

const commentData = [
  {
    comment_text:"Five stars for the Bootcamp program",
     post_id: 1
 }
  
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
