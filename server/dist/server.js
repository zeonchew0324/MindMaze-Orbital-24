"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const { PORT } = require('../process.env');
const express = require('express');
// Create an instance of Express
const app = express();
// Define a port number
const port = 5000;
// Middleware to parse JSON bodies
app.use(express.json());
app.use((0, cors_1.default)());
app.use(express.urlencoded({ extended: true }));
// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, WoRLD');
});
// Define default api route
app.get('/api', (req, res) => {
    res.json([{ message: 'Welcome to the API!' }, { message: 'Second line HHHH' }]);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
