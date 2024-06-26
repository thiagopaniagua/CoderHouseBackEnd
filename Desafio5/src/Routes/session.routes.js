import { Router } from "express";
import * as controller from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/info", controller.infoSession);
router.post("/logout", controller.logout);

export default router;
