const express = require('express')
const { createMovieDAO } = require('../dao/movie')
const { Movie } = require('../models/movie')
const { toViewModel } = require('../view-models/movie')

const movieDAO = createMovieDAO(Movie, toViewModel)

const router = express.Router()

router.get('/', (req, res, next) => {
  movieDAO.getAllMovies()
    .then(movies => {
      res.json(movies)
    })
    .catch(next)
})

router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId

  movieDAO.findMovieById(movieId)
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
  movieDAO.createMovie({ title: req.body.title })
    .then(movie => {
      res.json(movie)
    })
    .catch(next)
})

router.delete('/:movieId', (req, res, next) => {
  movieDAO.deleteMovieById(req.params.movieId)
    .then(movie => {
      res.json(movie)
    })
    .catch(next)
})

module.exports = {
  router
}