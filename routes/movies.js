const router = require('express').Router()
const { getSavedMovies, saveMovie, deleteSavedMovie } = require('../controllers/movies')
const { movieIdValidate, movieDataValidate } = require('../middlewares/validate')

// возвращает информацию о пользователе (email и имя)
router.get('/', getSavedMovies)
router.post('/', movieDataValidate, saveMovie)
router.delete('/:_id', movieIdValidate, deleteSavedMovie)

module.exports = router
