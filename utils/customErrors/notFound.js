const { NOT_FOUND } = require('../requestStatusCodes')

class NotFound extends Error {
  constructor(message) {
    super(message)
    this.code = NOT_FOUND
  }
}

module.exports = NotFound
