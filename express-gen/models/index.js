var path = require('path');
var fs   = require('fs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root:@localhost:3306/express');
var lodash    = require('lodash');
var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file !== 'index.js');
  })
  .forEach(function(file, key) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

module.exports = lodash.extend({
  Sequelize: Sequelize,
  sequelize: sequelize
}, db);