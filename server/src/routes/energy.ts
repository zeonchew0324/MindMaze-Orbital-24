import { handleGetEnergy, handleUpdateEnergy } from "../controllers/energyController";

import express from 'express';
const router = express.Router();

router.get('/:id', handleGetEnergy)

router.put('/:id', handleUpdateEnergy)

router.get('/', (req, res) => {
  res.json({message: 'hi'})
})

module.exports = router;