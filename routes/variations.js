const express = require('express');
const {
  variationsList,
  variationDetail,
  variationAddGet,
  variationAddPost,
  variationDeleteGet,
  variationDeletePost,
  variationUpdateGet,
  variationUpdatePost,
} = require('../controllers/variations-controller');

const router = express.Router();

router.get('/', variationsList);
router.get('/add', variationAddGet);
router.post('/add', variationAddPost);
router.get('/:id/delete', variationDeleteGet);
router.post('/:id/delete', variationDeletePost);
router.get('/:id/update', variationUpdateGet);
router.post('/:id/update', variationUpdatePost);
router.get('/:id', variationDetail);

module.exports = router;
