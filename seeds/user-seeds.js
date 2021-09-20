const { User } = require('../models');

const userData = [
  {
    username:"John",
     password: ""
 }
  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
