// load .env data into process.env
require('dotenv').config()

//External Imports
const express = require('express')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 54321

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

app.listen(port, () => {
  console.log(`app is listening on port ${ port }`)
})