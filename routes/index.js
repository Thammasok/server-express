const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/Home');

/* GET home page. */
router.get('/', HomeController.welcome);
router.get('/mongo', HomeController.postOnMongodb);

module.exports = router;