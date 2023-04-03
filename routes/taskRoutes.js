// External Imports
const express = require('express')
const router = express.Router()

// Helper functions
const db = require('../db')

// Get list of all tasks
router.get('/', (req, res) => {
  const tasksQuery = `SELECT * FROM tasks;`

  db.all(tasksQuery, [], (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      const tasksData = data;
      res.json({ tasksData })
    }
  })
})

// Get tasks by user id
router.get('/:id', (req, res) => {
  const userTasksQuery = `
    SELECT * FROM tasks 
    WHERE user_id = ${req.params.id};
  `

  db.all(userTasksQuery, [], (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      const userTasks = data;
      res.json({ userTasks })
    }
  })
})

// Create a new task
router.post('/', (req, res) => {
  const { description, category, user_id } = req.body;

  const insertTaskQuery = `
    INSERT INTO tasks (description, category, user_id)
    VALUES (?, ?, ?);
  `

  db.run(insertTaskQuery, [description, category, user_id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ task: { id: this.lastID, description, category, user_id } });
    }
  })
})


module.exports = router
