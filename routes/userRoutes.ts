import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
