const { createMovieDAO } = require('./movie')
const { toViewModel } = require('../view-models/movie')

describe('movie', () => {
  describe('dao', () => {
    it ('deltes movies by ID', async () => {
      const Movie = {
        findByIdAndRemove: jest.fn(id =>
          Promise.resolve({id: 'anId', title: 'La sirenita', __v: 0})
        )
      }

      const movieDAO = createMovieDAO(Movie, toViewModel)

      const movie = await movieDAO.deleteMovieById('anId')

      expect(movie).toEqual({id: 'anId', title: 'La sirenita'})
      expect(Movie.findByIdAndRemove).toHaveBeenCalledWith('anId')
    })
    it ('returns null if movie does not exist', async () => {
      const Movie = {
        findByIdAndRemove: jest.fn(id =>
          Promise.resolve(null)
        )
      }

      const movieDAO = createMovieDAO(Movie, toViewModel)

      const movie = await movieDAO.deleteMovieById('idDoesNotExists')

      expect(movie).toEqual(null)
      expect(Movie.findByIdAndRemove).toHaveBeenCalledWith('idDoesNotExists')
    })
  })
})