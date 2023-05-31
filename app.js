require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const { errors } = require('celebrate')
const cors = require('cors')
const helmet = require('helmet')

const centralErrorHandler = require('./middlewares/centralErrorHandler')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const limiter = require('./middlewares/limiter')

const routes = require('./routes/index')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(helmet());
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
