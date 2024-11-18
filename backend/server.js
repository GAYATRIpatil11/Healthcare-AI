const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authController = require('./authController');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
