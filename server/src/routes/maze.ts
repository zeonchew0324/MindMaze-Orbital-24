import { handleCompleteMaze, handleGetMaze, handleUpdateMaze } from "../controllers/mazeController";

const express = require('express');
const router = express.Router();

router.get('/:id', handleGetMaze)

router.put('/:id', handleUpdateMaze)

router.put('/completed/:id', handleCompleteMaze)

module.exports = router