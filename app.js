const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { router: moviesRouter } = require('./routes/movies')

const app = express()

app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/movies', moviesRouter)

app.use((err, req, res, next) => {
  res.status(500)
  res.json({
    error: err.message,
    stack: err.stack
  })
})

app.listen(8080, err => {
  if (err) {
    console.error(err)
  }
  console.log("Estoy escuchando en el puerto 8080")
})
