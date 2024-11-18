const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const router = express.Router();
const registerCsvPath = './data/register.csv';

let registeredUsers = [];

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = registeredUsers.find(user => user.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  registeredUsers.push({ name, email, password: hashedPassword });

  const csvWriter = require('csv-writer').createObjectCsvWriter({
    path: registerCsvPath,
    header: [
      { id: 'name', title: 'name' },
      { id: 'email', title: 'email' },
      { id: 'password', title: 'password' }
    ]
  });

  csvWriter.writeRecords(registeredUsers)
    .then(() => res.status(201).json({ message: 'User registered successfully' }))
    .catch(err => res.status(500).json({ message: 'Error saving user data' }));
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = registeredUsers.find(user => user.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  res.status(200).json({ message: 'Login successful', user });
});

module.exports = router;
