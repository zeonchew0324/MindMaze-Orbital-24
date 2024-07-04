import { handleGetTimetables, handleUpdateTimetables } from "../controllers/timetableController";

const express = require('express');
const router = express.Router();

// router.post('/timetables', async (req: Request, res: Response) => {
//   // Create timetable logic
// });

// router.get('/timetables', async (req: Request, res: Response) => {
//   // Get all timetables logic
// });

router.get('/:id/:index', handleGetTimetables)

router.put('/:id/:index', handleUpdateTimetables)


// router.delete('/timetables/:id', async (req: Request, res: Response) => {
//   // Delete timetable logic
// });

module.exports = router;
