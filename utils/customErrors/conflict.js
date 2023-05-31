const { CONFLICT } = require('../requestStatusCodes')

class Conflict extends Error {
  constructor(message) {
    super(message)
    this.code = CONFLICT
  }
}

module.exports = Conflict
