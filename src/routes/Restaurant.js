import { Router } from "express";
const router = Router();
import auth from "../middleware/check-auth";
import {
  getAllRestaurants,
  getRestaurantById,
  getAllRating,
  getNearRestaurants,
} from "../controllers/restaurant.controller";

router.get("/", auth, getAllRestaurants);
router.post("/nearRestaurants", auth, getNearRestaurants);
router.get("/ratings", getAllRating);
router.get("/:uid", auth, getRestaurantById);

export default router;
