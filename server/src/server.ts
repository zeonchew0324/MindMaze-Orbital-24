import { Request, Response } from "express"
import cors from 'cors'
import path from "path";
const { uploadTestData } = require("./firebase/firebase-config");
const express = require('express')

// Create an instance of Express
const app = express()

// Define a port number
const port = 5000 //dev

// Middleware to parse JSON bodies
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

// Serve react files
app.use(express.static(path.join(__dirname, '../../client/build')))

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

// Define a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, WoRLD')
})

// Define default api route
app.get('/api', (req: Request, res: Response) => {
  res.json([{ message: 'Welcome to the API!' }, { message: 'Second line HHHH' }])
})

// Test upload db
app.get('/test-upload', async (req: Request, res: Response) => {
  try {
    await uploadTestData(); 
    res.json([{ message: 'Test data uploaded successfully!' }])
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload test data.' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

