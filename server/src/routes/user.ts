import { handleChangeName, handleDeleteAccount, handleGetUsername, handleSignup } from "../controllers/userController";
import { decodeToken } from "../middleware/checkAuth";

const express = require('express');
const router = express.Router();

router.post('/signup', handleSignup); 
router.put('/change-name/:id', handleChangeName); 
router.delete('/delete/:id', handleDeleteAccount); 
router.get('/get-username/:id', handleGetUsername);

module.exports = router;