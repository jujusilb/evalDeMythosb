import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const authRoutes = Router();


authRoutes.post("/register", authController.createUser)
authRoutes.post("/login", authController.login)
authRoutes.get("/me", authController.me)
authRoutes.get("/users", authController.indexUser)
authRoutes.patch("/users/:id/role", authController.patchRole)