const express = require('express');
const {
  openingsList,
  openingDetail,
  openingAddGet,
  openingAddPost,
  openingDeleteGet,
  openingDeletePost,
  openingUpdateGet,
  openingUpdatePost,
} = require('../controllers/openings-controller');

const router = express.Router();

router.get('/', openingsList);
router.get('/add', openingAddGet);
router.post('/add', openingAddPost);
router.get('/:id/delete', openingDeleteGet);
router.post('/:id/delete', openingDeletePost);
router.get('/:id/update', openingUpdateGet);
router.post('/:id/update', openingUpdatePost);
router.get('/:id', openingDetail);

module.exports = router;
