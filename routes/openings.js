const express = require('express');
const {
  openingsList,
  openingDetail,
  openingCreateGet,
  openingCreatePost,
} = require('../controllers/openings-controller');

const router = express.Router();

router.get('/', openingsList);
router.get('/create', openingCreateGet);
router.post('/create', openingCreatePost);
router.get('/:id', openingDetail);

module.exports = router;
