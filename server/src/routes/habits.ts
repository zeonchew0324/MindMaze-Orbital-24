import {
  handleAddHabits,
  handleDeleteHabits,
  handleGetHabits,
  handleUpdateHabits,
} from "../controllers/habitsController";

const express = require("express");
const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
// });

router.get("/:id", handleGetHabits);

router.put("/:id", handleAddHabits);

router.delete("/:id/:habitId", handleDeleteHabits);

router.put("/:id/:habitId", handleUpdateHabits);

module.exports = router;
