function toViewModel (mongooseMovie) {
  return {
    title: mongooseMovie.title,
    id: mongooseMovie.id
  }
}

module.exports = {
  toViewModel
}