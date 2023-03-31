const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('organized.sqlite')

db.serialize(() => {
  // Drop existing tables
  db.run('DROP TABLE IF EXISTS users')
  db.run('DROP TABLE IF EXISTS tasks')

  // Create tables
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT
  )`)

  db.run(`CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    description TEXT,
    category TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  )`)

  // Insert data into users table
  const userStmt = db.prepare('INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)')
  userStmt.run(1, 'John', 'Doe', 'johndoe@example.com', 'password123')
  userStmt.run(2, 'Jane', 'Doe', 'janedoe@example.com', 'password456')
  userStmt.finalize()

  // Insert data into tasks table
  const taskStmt = db.prepare('INSERT INTO tasks (id, user_id, description, category) VALUES (?, ?, ?, ?)')
  taskStmt.run(1, 1, 'Task 1 for John', 'Category A')
  taskStmt.run(2, 1, 'Task 2 for John', 'Category B')
  taskStmt.run(3, 2, 'Task 1 for Jane', 'Category A')
  taskStmt.run(4, 2, 'Task 2 for Jane', 'Category B')
  taskStmt.finalize()
})

module.exports = db

