const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');

const { createConnectionString } = require('./utils/create-connection-string')

const dbPassword = process.env.DB_PASSWORD

if (!dbPassword) {
  throw new Error('Tienes que configurar la variable de entorno DB_PASSWORD')
}

mongoose.connect(
  createConnectionString({
    userName: 'UsuarioPeliculas',
    password: dbPassword,
    databaseName: 'pelicuitas'
  }),
  { useNewUrlParser: true }
).then(() => {
  console.log("Conectado a la base de datos!!")
})
.catch(err => {
  console.error("Ha habido un error al conectarse a la BBDD")
  console.error(err)
})

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
