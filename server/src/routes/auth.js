import { Router } from "express";

import {
    forgotPassword,
  changePassword,
  signup,
  login,
  validateToken
} from "../controllers/auth.js";
import { User } from "../db/index.js";
const router = Router();
import { body } from 'express-validator';
// create reset pass link
router.post("/forgot-password", forgotPassword);
// reset the password
router.post(
  "/reset-password/:token",
  body("password").trim().isLength({ min: 10 }),
  changePassword
);

router.post(
  "/signup",
  // validate using express-validator
  // create a custom validator
  body("email").custom(async (value) => await User.findByEmail(value)),
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").trim().isLength({ min: 5 }),
  body("firstName").trim().not().isEmpty(),
  body("lastName").trim().not().isEmpty(),
  signup
);
router.get(
  "/validate-token/:token",
  validateToken
);
router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email."),
  login
);

export default router;