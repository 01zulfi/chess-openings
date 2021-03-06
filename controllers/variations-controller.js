const { body, validationResult } = require('express-validator');
const Variation = require('../models/variation');
const Opening = require('../models/opening');
const Password = require('../utils/password-manager');

exports.variationsList = (req, res, next) => {
  Variation.find({})
    .populate('opening')
    .exec((err, result) => {
      if (err) return next(err);
      return res.render('variations-list', {
        title: 'Variations',
        variations: result,
      });
    });
};

exports.variationDetail = (req, res, next) => {
  Variation.findById(req.params.id)
    .populate('opening')
    .exec((err, result) => {
      if (err) return next(err);
      if (!result) return res.render('404');
      return res.render('variation-detail', {
        title: `${result.name} | Variations`,
        variation: result,
        opening: result.opening,
      });
    });
};

exports.variationAddGet = (req, res, next) => {
  Opening.find({}).exec((err, result) => {
    if (err) return next(err);
    return res.render('variation-form', {
      title: 'Add a Variation',
      openings: result,
    });
  });
};

exports.variationAddPost = [
  /* eslint-disable newline-per-chained-call */
  body('name', 'Name must not be empty.').trim().notEmpty().escape().unescape(),
  body('opening', 'Opening must not be empty.')
    .trim()
    .notEmpty()
    .escape()
    .unescape(),
  body('moves', 'Moves must not be empty.')
    .trim()
    .notEmpty()
    .escape()
    .unescape(),
  body('description').trim().escape().unescape(),
  body('origin').trim().escape().unescape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const variation = new Variation({
      name: req.body.name,
      opening: req.body.opening,
      moves: req.body.moves,
      description: req.body.description,
      origin: req.body.origin,
    });

    if (!errors.isEmpty()) {
      return Opening.find({}).exec((err, result) => {
        if (err) return next(err);
        return res.render('variation-form', {
          title: 'Add a Variation',
          openings: result,
          variation,
          errors: errors.array(),
        });
      });
    }

    return Variation.findOne({ name: variation.name }).exec((err, result) => {
      if (err) return next(err);
      if (result) return res.redirect(result.url);
      return variation.save((error) => {
        if (error) return next(error);
        return Opening.findByIdAndUpdate(
          variation.opening,
          { $push: { variations: variation._id } },
          {},
          (er) => {
            if (er) return next(er);
            return res.redirect(variation.url);
          },
        );
      });
    });
  },
];

exports.variationDeleteGet = (req, res, next) => {
  Variation.findById(req.params.id).exec((err, result) => {
    if (err) return next(err);
    if (!result) return res.render('404');
    if (Password.isVerified()) {
      Password.reset();
      return res.render('variation-delete', {
        title: `Delete Variation: ${result.name}`,
        variation: result,
      });
    }
    Password.setRedirectPath(`/variations/${req.params.id}/delete`);
    return res.redirect('/password');
  });
};

exports.variationDeletePost = (req, res, next) => {
  Variation.findById(req.params.id).exec((err, result) => {
    if (err) return next(err);
    return Opening.findByIdAndUpdate(
      result.opening,
      { $pull: { variations: result._id } },
      {},
      (er) => {
        if (er) return next(er);
        return Variation.findByIdAndRemove(req.body.variationId, (error) => {
          if (error) return next(error);
          return res.redirect('/variations');
        });
      },
    );
  });
};

exports.variationUpdateGet = (req, res, next) => {
  Variation.findById(req.params.id).exec((err, result) => {
    if (err) return next(err);
    if (!result) return res.render('404');
    if (Password.isVerified()) {
      Password.reset();
      return Opening.find({}).exec((error, openings) => {
        if (error) return next(error);
        return res.render('variation-form', {
          title: `Update Variation: ${result.name}`,
          variation: result,
          openings,
          update: true,
        });
      });
    }
    Password.setRedirectPath(`variations/${req.params.id}/update`);
    return res.redirect('/password');
  });
};

exports.variationUpdatePost = [
  /* eslint-disable newline-per-chained-call */
  body('name', 'Name must not be empty.').trim().notEmpty().escape().unescape(),
  body('opening', 'Opening must not be empty.')
    .trim()
    .notEmpty()
    .escape()
    .unescape(),
  body('moves', 'Moves must not be empty.')
    .trim()
    .notEmpty()
    .escape()
    .unescape(),
  body('description').trim().escape().unescape(),
  body('origin').trim().escape().unescape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const variation = new Variation({
      name: req.body.name,
      opening: req.body.opening,
      moves: req.body.moves,
      description: req.body.description,
      origin: req.body.origin,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      return Opening.find({}).exec((err, result) => {
        if (err) return next(err);
        return res.render('variation-form', {
          title: 'Add a Variation',
          openings: result,
          variation,
          errors: errors.array(),
        });
      });
    }

    Variation.findById(req.params.id).exec((err, result) => {
      if (err) return next(err);
      return Opening.findByIdAndUpdate(
        result.opening,
        {
          $pull: { variations: result._id },
        },
        {},
        () => {},
      );
    });

    return Variation.findByIdAndUpdate(
      req.params.id,
      variation,
      {},
      (err, result) => {
        if (err) return next(err);
        return Opening.findByIdAndUpdate(
          variation.opening,
          {
            $push: { variations: variation._id },
          },
          {},
          (error) => {
            if (error) return next(error);
            return res.redirect(result.url);
          },
        );
      },
    );
  },
];
