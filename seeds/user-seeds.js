const { User } = require('../models');

const userData = [
  {
    username:"user",
     password: 1234
 }
  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
