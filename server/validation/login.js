const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'email is not valid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'email is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password must be at least 6 characters';
  }

  return { errors, isValid: isEmpty(errors) };
};
