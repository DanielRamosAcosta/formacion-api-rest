function createConnectionString(config) {
  const {
    protocol = 'mongodb',
    userName,
    password,
    domain = 'ds123372.mlab.com',
    port = 23372,
    databaseName
  } = config

  return `${protocol}://${userName}:${password}@${domain}:${port}/${databaseName}`
}

module.exports = {
  createConnectionString
}
