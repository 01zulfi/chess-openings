const express = require('express');
const {
  openingsList,
  openingDetail,
} = require('../controllers/openings-controller');

const router = express.Router();

router.get('/', openingsList);
router.get('/:id', openingDetail);

module.exports = router;
