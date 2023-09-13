require('dotenv')
  .config()

const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const { errors } = require('celebrate')
const cors = require('cors')
const helmet = require('helmet')

const centralErrorHandler = require('./middlewares/centralErrorHandler')
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger')
const limiter = require('./middlewares/limiter')

const routes = require('./routes/index')
const {
  DEV_PORT,
  DEV_DB,
} = require('./utils/config')

const app = express()
const port = process.env.PORT || DEV_PORT

app.use(cors({
  origin: [
    'localhost:3000',
    'http://localhost:3000',
    'http://web-dev-sev.ru',
    'https://web-dev-sev.ru',
    'http://www.web-dev-sev.ru',
    'https://www.web-dev-sev.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

mongoose.connect(process.env.DB_CONN || DEV_DB, {
  useNewUrlParser: true,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(helmet())
app.use(limiter)

app.use(requestLogger)

app.use('/', routes)

app.use(errorLogger)

// validation errors by Joi-library
app.use(errors())

// main error processing
app.use(centralErrorHandler)

app.listen(port, () => {
  // console.log(`App listening on port ${port}`)
})
