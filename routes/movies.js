const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/', (req, res, next) => {
  db.getAllMovies()
    .then(movies => {
      res.json(movies)
    })
    .catch(next)
})

router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId

  db.findMovieById(movieId)
    .then(movie => 
      movie 
      ? res.json(movie)
      : res.status(404).json({
        error: `Could not find movie with id ${movieId}`
      })
    )
    .catch(next)
})

router.post('/', (req, res, next) => {
  db.createMovie({ title: req.body.title })
    .then(movie => {
      res.json(movie)
    })
    .catch(next)
})

router.delete('/:movieId', (req, res, next) => {
  db.deleteMovieById(req.params.movieId)
    .then(movie => {
      res.json(movie)
    })
    .catch(next)
})

module.exports = {
  router
}