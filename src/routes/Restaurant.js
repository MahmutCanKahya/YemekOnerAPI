import { Router } from "express";
const router = Router();
import auth from "../middleware/check-auth";
import { getAllRestaurants, getRestaurantById, getAllRating } from "../controllers/restaurant.controller";

router.get("/", auth, getAllRestaurants);
router.get("/:uid", auth, getRestaurantById);
router.get("/rating",getAllRating);

export default router;
