const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session');
const KnexSessionStore = require("connect-session-knex")(session)
const db = require('../../data/db-config')

const sessionConfig = {
  name: 'notsession', // default is connect.sid
  secret: 'nobody tosses a dwarf!',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false, // only set cookies over https. Server will not send back a cookie over http.
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
  }, // 1 day in milliseconds
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db, // configured instance of knex
    createtable: true, // if the table does not exist in the db, create it automatically
  }),
}

module.exports = server => {
  server.use(morgan())
  server.use(helmet())
  server.use(session(sessionConfig))
  server.use(cors())
}