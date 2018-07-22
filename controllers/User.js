const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');

const config = require('../config/config');
const models  = require('../models');

function generateToken(user) {
  var payload = {
    iss: config.ISS,
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, config.TOKEN_SECRET);
}

exports.signup = function (req, res, next) {
  req.assert('displayname', 'Displayname is not valid').notEmpty();
  req.assert('username', 'Username is not valid').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(
      errors
    );
  }

  bcrypt.hash(req.body.password, 10, function(err, hashPassword) {
    models.User.build({ 
      displayname: req.body.displayname, 
      username: req.body.username, 
      password: hashPassword
    }).save()
    .then(function(user) {
      return res.status(200).json({
        id: user.id,
        displayname: user.displayname
      });
    })
    .catch(function(error) {
      return res.status(403).json({
        message: error.errors[0].message,
        field: error.errors[0].path,
        value: error.errors[0].value
      });
    });
  });
}

exports.signin = function (req, res, next) {
  req.assert('username', 'Username is not valid').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(
      errors
    );
  }

  models.User.findAll({
    where: {
      username: req.body.username
    }
  }).then(function(users) {
    bcrypt.compare(req.body.password, users[0].password, function(err, result) {
      if(result) {
        let token = generateToken(users[0]);
        return res.status(200).json({
          token: token
        });
      } else {
        return res.status(403).json({
          msg: "Username or Password is incorrect."
        });
      } 
    });
  });
}