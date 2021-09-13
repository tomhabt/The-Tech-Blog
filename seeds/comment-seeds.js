const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Comment 1',
  }
  
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
