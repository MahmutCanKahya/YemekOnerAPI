import { Router } from "express";
const router = Router();
import auth from "../middleware/check-auth";
import { getAllMeal, getMealById } from "../controllers/meal.controller";

router.get("/", auth, getAllMeal);
router.get("/:uid", auth, getMealById);

export default router;
