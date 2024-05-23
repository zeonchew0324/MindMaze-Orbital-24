const {PORT} = require('../process.env')
const express = require('express')

// Create an instance of Express
const app = express()

//Firebase admin
const admin = require('firebase-admin')
const credentials = require('../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

// Define a port number
const port = PORT || 3000

// Middleware to parse JSON bodies
app.use(express.json())

app.use(express.urlencoded({extended: true}))

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, WoRLD')
})

// Define default api route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' })
})

// Signup post request
app.post('/signup', async (req, res) => {
  const userResponse = await admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    disabled: false
  })
  res.json(userResponse)
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
