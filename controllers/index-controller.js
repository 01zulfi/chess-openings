const async = require('async');
const Opening = require('../models/opening');
const Variation = require('../models/variation');

exports.countDocuments = (req, res, next) => {
  async.parallel(
    {
      openingsCount: (cb) => {
        Opening.countDocuments({}, cb);
      },
      variationsCount: (cb) => {
        Variation.countDocuments({}, cb);
      },
    },
    (err, result) => {
      if (err) return next(err);
      return res.render('index', {
        title: 'Chess Openings',
        ...result,
      });
    },
  );
};
