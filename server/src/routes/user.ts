import { handleChangeName, handleDeleteAccount, handleSignup } from "../controllers/userController";
import { decodeToken } from "../middleware/checkAuth";

const express = require('express');
const router = express.Router();

router.post('/signup', handleSignup); 
router.put('/change-name/:id', handleChangeName, decodeToken); 
router.delete('/delete/:id', handleDeleteAccount, decodeToken); 

module.exports = router;