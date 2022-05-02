const express = require('express');
const {
  variationsList,
  variationDetail,
  variationAddGet,
  variationAddPost,
} = require('../controllers/variations-controller');

const router = express.Router();

router.get('/', variationsList);
router.get('/add', variationAddGet);
router.post('/add', variationAddPost);
router.get('/:id', variationDetail);

module.exports = router;
