module.exports = function(sequelize, Sequelize) {
  var Books = sequelize.define('Books', {
    name: Sequelize.STRING,
    author: Sequelize.STRING
  });

  return Books;
};