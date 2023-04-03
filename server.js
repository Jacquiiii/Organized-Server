// External Imports
const express = require('express')
const morgan = require('morgan')
const http = require('http')
const cors = require('cors')

const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 54321

// Enable CORS for all requests
app.use(cors())

// DB code
const db = require('./db')

// Middleware
app.use( morgan('dev'))
app.use( express.urlencoded({extended: true}))
app.use( express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
}) // To resolve cors issue when requesting data from client side

app.get('/', (req, res) => {
  console.log('success')
})

// Separated Routes for each Resource
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

// Mount all resource routes
app.use( '/users', userRoutes )
app.use( '/tasks', taskRoutes )

// Closes db on server close
server.on('close', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('SQLite connection closed.');
    }
  });
});

app.listen(port, () => {
  console.log(`app is listening on port ${ port }`)
})