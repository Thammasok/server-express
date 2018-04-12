var models  = require('../models');

exports.welcome = function(req, res, next) {
  res.render('index', { title: 'Express2' });
}