// backend/routes/skillsRoutes.js

const express = require("express");
const router = express.Router();
const skillsController = require("../controllers/skillsController");
const authenticateUser = require("../middleware/authMiddleware");

// Route CREATE (Création d'une compétence)
router.post("/", authenticateUser, skillsController.createSkill);

// Route READ (Récupération des compétences d'un utilisateur)
router.get("/:userId", authenticateUser, skillsController.getUserSkills);

// Route UPDATE (Mise à jour d'une compétence)
router.put("/:skillId", authenticateUser, skillsController.updateSkill);

// Route DELETE (Suppression d'une compétence)
router.delete("/:skillId", authenticateUser, skillsController.deleteSkill);

module.exports = router;
