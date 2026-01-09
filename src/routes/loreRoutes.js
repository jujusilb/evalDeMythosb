import { Router } from "express";
import { loreController } from "../controllers/loreController.js";

export const loreRoutes = Router();

loreRoutes.get("/creature/:id", loreController.showCreature);
loreRoutes.get("/creatures", loreController.indexCreature);
loreRoutes.get("/creatures/:id/testimonies", loreController.creatureAbout);
loreRoutes.post("/creature", loreController.createCreature);
loreRoutes.post("/testimony", loreController.indexTestimony);
loreRoutes.post("/testimony/:id/validate", loreController.validateTestimony);
loreRoutes.post("/testimony/:id/reject", loreController.rejectTestimony);

