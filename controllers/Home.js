const models  = require('../models');
const PostMongoModel = require('../mongo_models/post');

exports.welcome = function(req, res, next) {
  res.render('index', { title: 'Express2' });
}

exports.postOnMongodb = function(req, res, next) {
  const post = new PostMongoModel({
    owner_id : "1",
    owner_name : "Jaranchai",
    title : "Test mongodb",
    detail : "Test save data to mongoDB"
  });

  post.save().then((info) => {
    return res.status(200).json(info);
  }).catch((err) => {
    return res.status(403).json(err);
  });

}