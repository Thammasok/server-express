const express = require('express');
const router = express.Router();

const imageController = require('../../controllers/image');

router.post('/', imageController.uploadFile);

module.exports = router;
