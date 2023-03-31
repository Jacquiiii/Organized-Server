const express = require('express');
const router = express.Router();
const db = require('../db');

// Get list of all users
router.get('/', (req, res) => {
  const usersQuery = `SELECT * FROM users;`;

  db.all(usersQuery, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ usersData: rows });
  });
});

// Get user by email
router.get('/:email', (req, res) => {
  const userEmailQuery = `SELECT * FROM users WHERE email = ?;`;

  db.get(userEmailQuery, [req.params.email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ userData: row });
  });
});

module.exports = router;
