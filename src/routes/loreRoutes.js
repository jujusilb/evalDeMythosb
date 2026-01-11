import { Router } from "express";
import { loreController } from "../controllers/loreController.js";
import { authenticateToken } from "../middlewares/auth.js";

export const loreRoutes = Router();

loreRoutes.get("/creature/:id", loreController.showCreature); //DONE
loreRoutes.get("/creatures", loreController.indexCreature); //DONE
loreRoutes.get("/creature/:id/testimony", loreController.creatureAbout); //DONE
loreRoutes.post("/creature", authenticateToken, loreController.createCreature);//DONE
loreRoutes.post("/testimony", authenticateToken, loreController.createTestimony); //Done
loreRoutes.post("/testimony/:id/validate", loreController.validateTestimony);
loreRoutes.post("/testimony/:id/reject", loreController.rejectTestimony);

