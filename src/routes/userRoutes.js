// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

// GET /users/index
router.get("/index", userController.index);

// POST /users (Create)
router.post("/new", userController.create);

// GET /users/:id (Read)
router.get("/:id/show", userController.show);

// PUT /users/:id (Update)
router.put("/:id/update", userController.update);

// DELETE /users/:id (Delete)
router.delete("/:id/delete", userController.delete);

module.exports = router;
