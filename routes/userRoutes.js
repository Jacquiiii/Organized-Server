//External Imports
const express = require('express')
const router  = express.Router()

// Internal Helper function
const db = require('../db/connection')

// Get list of all users
router.get('/', (req, res) => {
  const userQuery = `SELECT * FROM users;`

  db.query(userQuery)
  .then(data => {
    const userData = data.rows;
    res.json({userData})
  })
  .catch( err => {
    res
      .status(500)
      .json({error: err.message})
  })

})

module.exports = router