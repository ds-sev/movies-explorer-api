const { UNAUTHORIZED } = require('../requestStatusCodes')

class Unauthorized extends Error {
  constructor(message) {
    super(message)
    this.code = UNAUTHORIZED
  }
}

module.exports = Unauthorized
