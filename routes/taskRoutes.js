// External Imports
const express = require('express')
const router = express.Router()

// Helper functions
const db = require('../db/connection')

// Get list of all tasks
router.get('/', (req, res) => {
  const tasksQuery = `SELECT * FROM tasks;`

  db.query(tasksQuery)
    .then(data => {
      const tasksData = data.rows;
      res.json({ tasksData })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
})

// Get tasks by user id
router.get('/:id', (req, res) => {

  const userTasksQuery = `
    SELECT * FROM tasks 
    WHERE user_id = ${req.params.id};
  `

  db.query(userTasksQuery)
    .then(data => {
      const userTasks = data.rows;
      res.json({ userTasks })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
})

module.exports = router