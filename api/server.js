const express = require('express')
const server = express()
const middleware = require('./middleware')
const routes = require('./routes')

server.use(express.json())
middleware(server)
routes(server)

server.get("/", (req, res) => {
  server.send("<h2>I am your server and I am alive!</h2>")
})

server.use((req, res, next) => {
  res.status(404).json({ message: "There was an issue with your request. Please try again."})
})

server.use((err, req, res, next) => {
  res.status(500).json({ message: "The server has failed you. I would suggest trying again later."})
})

module.exports = server;