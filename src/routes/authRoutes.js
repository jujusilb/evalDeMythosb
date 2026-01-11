import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const authRoutes = Router();


authRoutes.post("/auth/register", authController.register);
authRoutes.post("/auth/login", authController.login);
authRoutes.get("/auth/me", authController.me);
authRoutes.get("/admin/users", authController.indexUsers);
authRoutes.patch("/auth/users/:id/role", authController.patchRole);