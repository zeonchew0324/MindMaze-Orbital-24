const {PORT} = require('./process.env')
const express = require('express');

// Create an instance of Express
const app = express();

// Define a port number
const port = PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, WoRLD');
});

// Define another route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});