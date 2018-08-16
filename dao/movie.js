function createMovieDAO (Movie, toViewModel) {
  function findMovieById (id) {
    return Movie.findById(id).then(toViewModel)
  }
  
  function getAllMovies () {
    return Movie.find().then(movies => movies.map(toViewModel))
  }
  
  function createMovie (movie) {
    return new Movie({ title: movie.title })
      .save()
      .then(toViewModel)
  }
  
  function deleteMovieById (id) {
    return Movie.findByIdAndRemove(id)
      .then(deletedMovie => deletedMovie
        ? toViewModel(deletedMovie)
        : null
      )
  }

  return {
    findMovieById,
    getAllMovies,
    createMovie,
    deleteMovieById
  }  
 }

module.exports = {
  createMovieDAO
}