const { FORBIDDEN } = require('../requestStatusCodes')

class Forbidden extends Error {
  constructor(message) {
    super(message)
    this.code = FORBIDDEN
  }
}

module.exports = Forbidden
