import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const authRoutes = Router();
const preroute ="/auth"

authRoutes.post(preroute + "/register", authController.createUser)
authRoutes.post(preroute +"/login", authController.login)
authRoutes.get(preroute + "/me", authController.me)
authRoutes.get("/admin/users", authController.indexUser)
authRoutes.patch(preroute +"/users/:id/role", authController.patchRole)