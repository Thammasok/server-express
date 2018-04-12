'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    displayname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      field: 'username',
      allowNull: false,
      unique: true,
      validate: {
        // isEmail: true,
      }
    },
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    models.User.hasMany(models.Task);
  };

  return User;
};