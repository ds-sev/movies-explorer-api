const jwt = require('jsonwebtoken')
const Unauthorized = require('../utils/customErrors/unauthorized')

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt
  if (!cookie) {
    return next(new Unauthorized('Необходима авторизация'))
  }
  const token = cookie.replace('jwt', '')
  let payload
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'secret-key')
  } catch (err) {
    return next(Unauthorized('Необходима авторизация'))
  }
  req.user = payload
  return next()
}
