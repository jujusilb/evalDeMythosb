import { Router } from "express";
import { loreController } from "../controllers/loreController.js";
import { authenticateToken } from "../middlewares/auth.js";

export const loreRoutes = Router();

loreRoutes.get("/creature/:id", loreController.showCreature); //DONE
loreRoutes.get("/creatures", loreController.indexCreature); //DONE
loreRoutes.get("/creature/:id/testimony", loreController.creatureAbout); //DONE
loreRoutes.post("/creature", authenticateToken, loreController.createCreature);//DONE
loreRoutes.post("/testimony", authenticateToken, loreController.createTestimony); //Done
loreRoutes.patch("/testimony/:id/validate", authenticateToken, loreController.validateTestimony); //DONE
loreRoutes.patch("/testimony/:id/reject", authenticateToken, loreController.rejectTestimony); //Done

