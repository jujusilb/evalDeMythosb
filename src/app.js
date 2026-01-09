import express from "express";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { healthRoutes } from "./routes/healthRoutes.js";
import { loreRoutes } from "./routes/loreRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";



export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(logger);


// Route de base
  app.get("/", (req, res) => {
    res.json({
      message: "Vive la mytholohie grecque !",
      creature: "/creature"
    });
  });


  app.use(healthRoutes);
  app.use(authRoutes);
  app.use(loreRoutes);



  // 404 simple
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use(errorHandler);

  return app;
};

