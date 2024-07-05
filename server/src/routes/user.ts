import { handleChangeName, handleDeleteAccount, handleSignup } from "../controllers/userController";

const express = require('express');
const router = express.Router();

router.post('/signup', handleSignup); // Get all todos
router.put('/change-name/:id', handleChangeName); // Update a todo by ID
router.delete('/delete/:id', handleDeleteAccount); // Delete a todo by ID

module.exports = router;