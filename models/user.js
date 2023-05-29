const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный формат электронной почты'
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  }
})

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      console.log('unauth')
    }
    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) {
        console.log('unauth')
      }
      return user
    })
  })
}

module.exports = mongoose.model('user', userSchema)