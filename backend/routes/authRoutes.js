const express = require('express');
const router = express.Router();

// Dummy data to simulate user registration/login
let users = [
  { name: 'John Doe', email: 'john@example.com', password: 'password123' }
];

// POST route for login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  return res.status(200).json({ message: 'Login successful' });
});

// POST route for register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ name, email, password });
  return res.status(201).json({ message: 'User registered successfully' });
});

module.exports = router;
