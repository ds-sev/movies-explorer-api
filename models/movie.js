const mongoose = require('mongoose')
const CUSTOM_PATTERNS = require('../utils/constants')

const movieSchema = new mongoose.Schema({
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: Number,
    required: true,
  },
  // название фильма на русском языке
  nameRU: {
    type: String,
    required: true,
  },
  // название фильма на английском языке
  nameEN: {
    type: String,
    required: true,
  },
  // режиссёр фильма
  director: {
    type: String,
    required: true,
  },
  // страна создания фильма
  country: {
    type: String,
    required: true,
  },
  // год выпуска фильма
  year: {
    type: String,
    required: true,
  },
  // длительность фильма
  duration: {
    type: Number,
    required: true,
  },
  // описание фильма
  description: {
    type: String,
    required: true,
  },
  // ссылка на трейлер фильма
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return CUSTOM_PATTERNS.URL.test(value)
      },
    },
  },
  // ссылка на постер к фильму
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return CUSTOM_PATTERNS.URL.test(value)
      },
    },
  },
  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return CUSTOM_PATTERNS.URL.test(value)
      },
    },
  },
  // _id пользователя, который сохранил фильм
  owner: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('movie', movieSchema)
