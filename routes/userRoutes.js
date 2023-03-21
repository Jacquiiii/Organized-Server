// External Imports
const express = require('express')
const router = express.Router()

// Helper functions
const db = require('../db/connection')

// Get list of all users
router.get('/', (req, res) => {
  const usersQuery = `SELECT * FROM users;`

  db.query(usersQuery)
    .then(data => {
      const usersData = data.rows;
      res.json({ usersData })
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
    WHERE email = $1;
  `

  db.query(userEmailQuery, [req.params.email])
    .then(data => {
      const userData = data.rows[0];
      res.json({ userData })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
})

module.exports = router