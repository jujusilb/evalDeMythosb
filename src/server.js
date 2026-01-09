// src/server.js
import "dotenv/config";
import { createApp } from "./app.js";
import { mongoose } from 'mongoose';


const app = createApp()
const port = process.env.PORT || 3000;

  
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
}); 

mongoose.connect(process.env.DB_MONGO)
  .then(() => console.log("Connecté à MongoDB !"))
  .catch(err => console.error("Erreur de connexion :", err))




