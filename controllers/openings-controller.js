const { body, validationResult } = require('express-validator');
const Opening = require('../models/opening');
const Password = require('../utils/password-manager');
require('../models/variation');

exports.openingsList = (req, res, next) => {
  Opening.find({}, 'name variations url').exec((err, result) => {
    if (err) return next(err);
    if (!result) return res.render('404');
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
      if (!result) return res.render('404');
      return res.render('opening-detail', {
        title: `${result.name} | Openings`,
        opening: result,
        hasVariations: result.variations.length > 0,
      });
    });
};

exports.openingAddGet = (req, res, next) => {
  res.render('opening-form', {
    title: 'Add an Opening',
  });
};

exports.openingAddPost = [
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
      if (!result) return res.render('404');
      if (Password.isVerified()) {
        Password.reset();
        return res.render('opening-delete', {
          title: `Delete Opening: ${result.name}`,
          opening: result,
          hasVariations: result.variations.length > 0,
        });
      }
      Password.setRedirectPath(`/openings/${req.params.id}/delete`);
      return res.redirect('/password');
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

exports.openingUpdateGet = (req, res, next) => {
  Opening.findById(req.params.id).exec((err, result) => {
    if (err) return next(err);
    if (!result) return res.render('404');
    if (Password.isVerified()) {
      Password.reset();
      return res.render('opening-form', {
        title: `Update Opening: ${result.name}`,
        opening: result,
        update: true,
      });
    }
    Password.setRedirectPath(`/openings/${req.params.id}/update`);
    return res.redirect('/password');
  });
};

exports.openingUpdatePost = [
  /* eslint-disable newline-per-chained-call */
  body('name', 'Name must not be empty.').trim().notEmpty(),
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
    const openingDetail = {
      name: req.body.name,
      moves: req.body.moves,
      description: req.body.description,
      origin: req.body.origin,
      chessDotComUrl: req.body.chessDotComUrl,
    };

    if (!errors.isEmpty()) {
      return res.render('opening-form', {
        title: `Update Opening: ${openingDetail.name}`,
        opening: openingDetail,
        errors: errors.array(),
      });
    }

    return Opening.findByIdAndUpdate(
      req.params.id,
      { ...openingDetail },
      {},
      (err, result) => {
        if (err) return next(err);
        return res.redirect(result.url);
      },
    );
  },
];
