const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')


module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body
  bcrypt.hash(password, 10)
  .then((hash) => User.create({
    email, password: hash, name
  }))
  .then((user) => {
    // delete pass from response
    const userDataObject = user.toObject()
    delete userDataObject.password
    // res status
  })
  .catch(next)
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'secret-key',
      { expires: '7d' },
    )
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3600000 * 24 * 7,
    })
    res.send({token})
  })
  .catch(next)
}

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Успешный выход' })
}







module.exports.getUserInfo = (req, res, next) => {

}

module.exports.updateUserInfo = (req, res, dataToUpdate, next) => {

}