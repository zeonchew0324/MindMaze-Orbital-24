// Import necessary modules
import { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import express from 'express';
import { decodeToken } from './middleware/checkAuth';
const { uploadTestData } = require('./firebase/firebase-config');
const timetableRouter = require('./routes/timetable');
const habitsRouter = require('./routes/habits')
const todoRouter = require('./routes/todo');
const energyRouter = require('./routes/energy')
const mazeRouter = require('./routes/maze')

// Create an instance of Express
const app = express();

// Define a port number
const port = 5000; // Adjust port number as needed

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use('/api', decodeToken); // Applying decodeToken middleware for all routes under /api
app.use(express.urlencoded({ extended: true }));

// Mount routers
app.use('/api/timetables', timetableRouter);
app.use('/api/habits', habitsRouter);
app.use('/api/todos', todoRouter);  
app.use('/api/maze', mazeRouter);
app.use('/api/energy', energyRouter);  

// Serve react files (assuming this is for production deployment)
app.use(express.static(path.join(__dirname, '../../client/build')));

// Route to serve React frontend
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

// Test upload database route
app.get('/test-upload', async (req: Request, res: Response) => {
  try {
    await uploadTestData();
    res.json([{ message: 'Test data uploaded successfully!' }]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload test data.' });
  }
});

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
