import { Router } from "express";
import {
  saveRecommendation,
  recommendMeal,
} from "../controllers/recommend.controller";
import auth from "../middleware/check-auth";
const router = Router();

router.post("/", auth, recommendMeal);
router.post("/save", auth, saveRecommendation);

export default router;
