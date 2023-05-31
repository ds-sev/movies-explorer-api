const { Joi, celebrate } = require('celebrate')
const CUSTOM_PATTERNS = require('../utils/constants')

module.exports.movieDataValidate = celebrate({
  body: Joi.object().keys({
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    director: Joi.string().required(),
    country: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().regex(CUSTOM_PATTERNS.URL),
    image: Joi.string().required().regex(CUSTOM_PATTERNS.URL),
    thumbnail: Joi.string().required().regex(CUSTOM_PATTERNS.URL),
  }),
})

module.exports.movieIdValidate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
})

module.exports.userDataValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
})

module.exports.userSignInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
})

module.exports.userSignUpValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
})
