const jwt = require('jsonwebtoken');

const config = require('../config/config');

exports.normalMiddleware = function (req, res, next) {
  if (req.headers['content-type'] === "application/json") {
    if(req.headers['authorization'] === config.TOKEN_AUTHONRIZATION) {
      next();
    } else {
      return res.status(401).json({
        msg: 'authorization is not allow.'
      });
    }
  } else {
    return res.status(415).json({
      msg: "Not the specified content-type."
    });
  }
}

exports.authMiddleware = function (req, res, next) {
  if (req.headers['content-type'] === "application/json") {
    if(req.headers['authorization'] === config.TOKEN_AUTHONRIZATION) {
      jwt.verify(req.headers['login-token'], config.TOKEN_SECRET, function(err, decoded) {
        if(decoded) {
          next();
        } else {
          return res.status(401).json({
            msg: 'Login token is invalid or expired.'
          });
        }
      });
    } else {
      return res.status(401).json({
        msg: 'authorization is not allow.'
      });
    }
  } else {
    return res.status(415).json({
      msg: "Not the specified content-type."
    });
  }
}