const movies = [
  {id: "f31a2", title: 'El señor de los anillos'},
  {id: "f31a5", title: 'Vaiana'},
  {id: "f31a3", title: 'Memento'},
  {id: "f31a4", title: 'Olvídate de mi'},
  {id: "f31a1", title: 'El club de la lucha'},
  {id: "f31a6", title: 'Interestellar'}
]

function findMovieById (id) {
  return movies.find(m => m.id === id)
}

function getAllMovies () {
  return movies
}

function createMovie (movie) {
  const newMovie = {
    ...movie,
    id: Math.round(Math.random() * 10e10).toString()
  }

  movies.push(newMovie)
  return newMovie
}

module.exports = {
  findMovieById,
  getAllMovies,
  createMovie
}
