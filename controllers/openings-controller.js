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
