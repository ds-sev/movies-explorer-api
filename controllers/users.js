const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { CREATED } = require('../utils/requestStatusCodes')

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
    // delete pass from response
      const userDataObject = user.toObject()
      delete userDataObject.password
      res.status(CREATED).send(userDataObject)
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
        { expiresIn: '7d' },
      )
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000 * 24 * 7,
      })
      res.send({ message: 'Вы успешно вошли' })
    })
    .catch(next)
}

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Успешный выход' })
}

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch(next)
}

module.exports.updateUserInfo = (req, res, next) => {
  const userData = req.body
  const id = req.user._id
  User.findByIdAndUpdate(id, userData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch(next)
}
