const Variations = require('../models/variation');
require('../models/opening');

exports.variationsList = (req, res, next) => {
  Variations.find({})
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
  Variations.findById(req.params.id)
    .populate('opening')
    .exec((err, result) => {
      if (err) return next(err);
      return res.render('variation-detail', {
        title: `${result.name} | Variations`,
        variation: result,
        opening: result.opening,
      });
    });
};
