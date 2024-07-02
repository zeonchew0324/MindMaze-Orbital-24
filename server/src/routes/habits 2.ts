import { handleAddHabits, handleDeleteHabits, handleGetHabits } from "../controllers/habitsController";

const express = require('express');
const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
// });

router.get('/:id', handleGetHabits)

router.put('/:id', handleAddHabits)

router.delete('/:id/:habitId', handleDeleteHabits)

module.exports = router;