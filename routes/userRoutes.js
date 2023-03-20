// External Imports
const express = require('express')
const router = express.Router()

// Helper function
const db = require('../db/connection')

// Get list of all users
router.get('/', (req, res) => {
  const userQuery = `SELECT * FROM users;`

  db.query(userQuery)
    .then(data => {
      const userData = data.rows;
      res.json({ userData })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
})

// Get user by email
router.get('/:email', (req, res) => {

  const userEmailQuery = `
    SELECT * FROM users 
    WHERE email = ${req.params.id};;
  `

  db.query(userEmailQuery)
    .then(data => {
      const userData = data.rows;
      res.json({ userData })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
})

module.exports = router