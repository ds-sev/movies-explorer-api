const { BAD_REQUEST } = require('../requestStatusCodes')

class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.code = BAD_REQUEST
  }
}

module.exports = BadRequest
