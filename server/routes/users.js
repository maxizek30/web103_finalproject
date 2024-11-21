import express from "express";
import UserController from "../controllers/users.js";

const router = express.Router();

router.get("/:username", UserController.getUserByUsername);
router.post("/checklogin", UserController.checklogin);
router.post("/checksignup", UserController.checksignup);

export default router;
