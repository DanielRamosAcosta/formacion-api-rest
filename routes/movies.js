const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/', (req, res) => {
  const movies = db.getAllMovies()
  res.json(movies)
})

router.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId
  const movie = db.findMovieById(movieId)

  if (movie) {
    res.json(movie)
  } else {
    res.status(404)
    res.json({
      error: `Could not find movie with id ${movieId}`
    })
  }
})

router.post('/', (req, res) => {
  const movie = db.createMovie({ title: req.body.title })
  res.json(movie)
})

router.delete('/:movieId', (req, res) => {
  const movie = db.deleteMovieById(req.params.movieId)
  res.json(movie)
})

module.exports = {
  router
}