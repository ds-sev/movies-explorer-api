const router = require('express').Router()
const { getUserInfo, updateUserInfo } = require('../controllers/users')
const { userDataValidate } = require('../middlewares/validate')

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserInfo)
router.patch('/me', userDataValidate, updateUserInfo)

module.exports = router
