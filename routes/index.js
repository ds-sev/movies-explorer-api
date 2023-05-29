const router = require('express').Router()
const { getUserInfo, updateUserInfo, createUser, login, logout } = require('../controllers/users')

// возвращает информацию о пользователе (email и имя)
router.post('/signup', createUser)
router.post('/signin', login)
router.post('/signout', logout)
// router.use('/users', auth, require('./users'))
// router.use('/movies', auth, require('./movies'))

// router.use('*', ())

module.exports = router