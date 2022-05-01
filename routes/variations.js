const express = require('express');
const {
  variationsList,
  variationDetail,
} = require('../controllers/variations-controller');

const router = express.Router();

router.get('/', variationsList);
router.get('/:id', variationDetail);

module.exports = router;
