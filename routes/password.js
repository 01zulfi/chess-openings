const express = require('express');
const {
  passwordGet,
  passwordPost,
} = require('../controllers/password-controller');

const router = express.Router();

router.get('/', passwordGet);
router.post('/', passwordPost);

module.exports = router;
