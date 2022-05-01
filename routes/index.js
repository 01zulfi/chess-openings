const express = require('express');
const { countDocuments } = require('../controllers/index-controller');

const router = express.Router();

router.get('/', countDocuments);

module.exports = router;
