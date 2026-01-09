// src/server.js
import "dotenv/config";
import { createApp } from "./app.js";
import { prisma } from "./prismaClient.js";
import { mongoose } from 'mongoose';
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Route de base
  app.get("/", (req, res) => {
    res.json({
      message: "Vive la mytholohie grecque !",
      creature: "/creature"
    });
  });
  
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
}); 

mongoose.connect(process.env.DB_MONGO)
  .then(() => console.log("Connecté à MongoDB !"))
  .catch(err => console.error("Erreur de connexion :", err))