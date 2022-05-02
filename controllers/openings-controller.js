const { body, validationResult } = require('express-validator');
const Opening = require('../models/opening');
require('../models/variation');

exports.openingsList = (req, res, next) => {
  Opening.find({}, 'name variations url').exec((err, result) => {
    if (err) return next(err);
    return res.render('openings-list', {
      title: 'Openings List',
      openings: result,
    });
  });
};

exports.openingDetail = (req, res, next) => {
  Opening.findById(req.params.id)
    .populate('variations')
    .exec((err, result) => {
      if (err) return next(err);
      return res.render('opening-detail', {
        title: `${result.name} | Openings`,
        opening: result,
        hasVariations: result.variations.length > 0,
      });
    });
};

exports.openingCreateGet = (req, res, next) => {
  res.render('opening-form', {
    title: 'Add an Opening',
  });
};

exports.openingCreatePost = [
  /* eslint-disable newline-per-chained-call */
  body('name', 'Name must not be empty.').trim().notEmpty().escape().unescape(),
  body('moves', 'Moves must not be empty.')
    .trim()
    .notEmpty()
    .escape()
    .unescape(),
  body('description').trim().escape().unescape(),
  body('origin').trim().escape().unescape(),
  body('chessDotComUrl').trim().escape().unescape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const opening = new Opening({
      name: req.body.name,
      moves: req.body.moves,
      description: req.body.description,
      origin: req.body.origin,
      chessDotComUrl: req.body.chessDotComUrl,
    });

    if (!errors.isEmpty()) {
      return res.render('opening-form', {
        title: 'Add an Opening',
        opening,
        errors: errors.array(),
      });
    }

    return Opening.findOne({ name: opening.name }).exec((err, result) => {
      if (err) return next(err);
      if (result) return res.redirect(result.url);
      return opening.save((error) => {
        if (error) return next(error);
        return res.redirect(opening.url);
      });
    });
  },
];

exports.openingDeleteGet = (req, res, next) => {
  Opening.findById(req.params.id)
    .populate('variations')
    .exec((err, result) => {
      if (err) return next(err);
      return res.render('opening-delete', {
        title: `Delete Opening: ${result.name}`,
        opening: result,
        hasVariations: result.variations.length > 0,
      });
    });
};

exports.openingDeletePost = (req, res, next) => {
  Opening.findById(req.params.id)
    .populate('variations')
    .exec((err, result) => {
      if (err) return next(err);
      if (result.variations.length > 0) {
        return res.render('opening-delete', {
          title: `Delete Opening: ${result.name}`,
          opening: result,
          hasVariations: result.variations.length > 0,
        });
      }
      return Opening.findByIdAndRemove(req.body.openingId, (error) => {
        if (error) return next(error);
        return res.redirect('/openings');
      });
    });
};
