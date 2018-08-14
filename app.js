const http = require('http')

const db = require('./database')

const server = http.createServer(function (request, response) {
  console.log(request.url)

  if ((request.url === '/movies' || request.url.startsWith('/movies?')) && request.method === 'GET') {
    const movies = db.getAllMovies()

    if (request.url.startsWith('/movies?')) {
      const queryString = request.url.substr(8)
      const fieldToOrder = queryString.substr(7)
      movies.sort((a, b) => {
        return a[fieldToOrder] > b[fieldToOrder]
      })
    }
    
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.write(JSON.stringify(movies))
    response.end()
    return
  }

  if (request.url === '/movies' && request.method === 'POST') {
    let body = '';

    request.on('data', data => {
        body += data;
        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
          request.connection.destroy();
        }
    });

    request.on('end', function () {
      const clientMovie = JSON.parse(body)

      const movie = db.createMovie({ title: clientMovie.title })
      response.writeHead(201, {
        'Content-Type': 'application/json'
      })
      response.write(JSON.stringify(movie))
      response.end()
      return
    })
    return
  }
  
  if (new RegExp("/movies/(.+)").test(request.url)) {
    const [, movieId] = request.url.match(new RegExp("/movies/(.+)"))
    const movie = db.findMovieById(movieId)

    if (movie) {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      })
      response.write(JSON.stringify(movie))
      response.end()
    } else {
      response.writeHead(404, {
        'Content-Type': 'application/json'
      })
      response.write(JSON.stringify({
        error: `Could not find movie with id ${movieId}`
      }))
      response.end()
    }
    return
  }

  response.writeHead(400, {
    'Content-Type': 'application/json'
  })
  response.write(JSON.stringify({
    error: 'I do not understand that'
  }))
  response.end()
})

server.listen(8080, function (err) {
  if (err) {
    console.error(err)
  }
  console.log("Estoy escuchando en el puerto 8080")
})
