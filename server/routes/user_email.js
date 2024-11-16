import express from "express";
import UserEmailController from "../controllers/user_email.js"


const router = express.Router();

router.post("/checklogin", UserEmailController.checklogin);
router.post("/checksignup", UserEmailController.checksignup);

export default router;