const { Post } = require('../models');

const postData = [
  {
    post_title:"Web Development Coding Bootcamp Review",
    post_content: "The Course is provided in two basis of Full time and Part-time.",
    user_id: 1
 },
 {
  post_title:"Why MVC is so important",
  post_content: "MVC allows developers to maintain a true separation of concerns, advising thier code between the view layer for design , and the controller layer for appliction logic",
  user_id: 1
}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
