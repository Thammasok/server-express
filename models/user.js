'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    displayname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};