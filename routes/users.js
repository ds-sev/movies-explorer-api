const router = require('express').Router()
const {getUserInfo, updateUserInfo} = require('../controllers/users')

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserInfo)
router.patch('/me', updateUserInfo)

module.exports = router