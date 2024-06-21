import { handleGetTimetables, handleUpdateTimetables } from "../controllers/timetableController";
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from "../controllers/todoController";

const express = require('express');
const router = express.Router();

// router.post('/timetables', async (req: Request, res: Response) => {
//   // Create timetable logic
// });

// router.get('/timetables', async (req: Request, res: Response) => {
//   // Get all timetables logic
// });

router.get('/timetables/:id/:index', handleGetTimetables)

router.put('/timetables/:id/:index', handleUpdateTimetables)

//todo router
router.post('/todos', createTodo); // Create a new todo
router.get('/todos', getTodos); // Get all todos
router.get('/todos/:id', getTodoById); // Get a specific todo by ID
router.put('/todos/:id', updateTodo); // Update a todo by ID
router.delete('/todos/:id', deleteTodo); // Delete a todo by ID

// router.delete('/timetables/:id', async (req: Request, res: Response) => {
//   // Delete timetable logic
// });

module.exports = router;
