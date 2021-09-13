const { Post } = require('../models');

const postData = [
  {
    post_title: 'Title 1',
    post_content:'Content 1',
    user_id: 1
  },
  
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
