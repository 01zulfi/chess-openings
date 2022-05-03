const { body } = require('express-validator');
const Password = require('../utils/password-manager');

exports.passwordGet = (req, res, next) => res.render('password');

exports.passwordPost = [
  body('password').trim().escape(),
  (req, res, next) => {
    const inputPassword = req.body.password;
    if (Password.check(inputPassword)) {
      Password.setVerified(true);
      return res.redirect(Password.getRedirectPath());
    }
    Password.setVerified(false);
    return res.render('password', {
      message: 'Wrong password',
    });
  },
];
