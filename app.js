require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const cookieParser = require('cookie-parser')
const { errors } = require('celebrate')
const cors = require('cors')
const routes = require('./routes/index')
//errorsHandler
//logger

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: [],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization']
}))

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})