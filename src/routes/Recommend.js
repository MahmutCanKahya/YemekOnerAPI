import { Router } from "express";
import { saveRecommendation } from "../controllers/recommend.controller";
const router = Router();

router.post('/save',saveRecommendation)

export default router;
