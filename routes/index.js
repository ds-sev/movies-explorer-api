const router = require('express').Router()
const { createUser, login, logout } = require('../controllers/users')
const { userSignInValidate, userSignUpValidate } = require('../middlewares/validate')

const auth = require('../middlewares/auth')
const NotFound = require('../utils/customErrors/notFound')

// возвращает информацию о пользователе (email и имя)
router.post('/signup', userSignUpValidate, createUser)
router.post('/signin', userSignInValidate, login)
router.post('/signout', logout)
router.use('/users', auth, require('./users'))
router.use('/movies', auth, require('./movies'))

router.use('*', (req, res, next) => next(next(new NotFound())))

module.exports = router
