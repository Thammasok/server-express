const express = require('express');
const router = express.Router();

const middleware = require('../middlewares');
const userController = require('../controllers/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', middleware.normalMiddleware, userController.signup);
router.post('/signin', middleware.normalMiddleware, userController.signin);

module.exports = router;
