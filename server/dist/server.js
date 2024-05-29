"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const { uploadTestData } = require("./firebase/firebase-config");
const express = require('express');
// Create an instance of Express
const app = express();
// Define a port number
const port = 5000; //dev
// Middleware to parse JSON bodies
app.use(express.json());
app.use((0, cors_1.default)());
app.use(express.urlencoded({ extended: true }));
// Serve react files
app.use(express.static(path_1.default.join(__dirname, '../../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
});
// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, WoRLD');
});
// Define default api route
app.get('/api', (req, res) => {
    res.json([{ message: 'Welcome to the API!' }, { message: 'Second line HHHH' }]);
});
// Test upload db
app.get('/test-upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield uploadTestData();
        res.json([{ message: 'Test data uploaded successfully!' }]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to upload test data.' });
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
