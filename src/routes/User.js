import { Router } from "express";
const router = Router();

import {
  getUsers,
  signUpUser,
  updateUser,
  validateUser
} from "../controllers/user.controller";

router.get("/", getUsers);
router.put("/:id", updateUser);

router.post("/", signUpUser);
router.post("/validate", validateUser);

export default router;
