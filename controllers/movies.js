const Movie = require('../models/movie')
const { created } = require('../utils/requestStatusCodes')
const Forbidden = require('../utils/customErrors/forbidden')

// возвращает все сохранённые текущим пользователем фильмы
module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next)
}

// создаёт фильм с переданными данными в теле:
module.exports.saveMovie = (req, res, next) => {
  const {
    id,
    nameRU,
    nameEN,
    director,
    country,
    year,
    duration,
    description,
    trailerLink,
    image,
    thumbnail,
  } = req.body
  Movie.create({
    movieId: id,
    nameRU,
    nameEN,
    director,
    country,
    year,
    duration,
    description,
    trailerLink,
    image,
    thumbnail,
    owner: req.user._id,
  })
    .then((movie) => res.status(created).send(movie))
    .catch(next)
}

// удаляет сохранённый фильм по id
module.exports.deleteSavedMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      if (req.user._id === movie.owner) {
        movie.deleteOne()
          .then(() => res.send({ message: 'Фильм удален из избранного' }))
          .catch(next)
      } else {
        next(new Forbidden('Нельзя удалять фильмы, добавленные другими пользователями'))
      }
    })
    .catch(next)
}
