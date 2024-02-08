// backend/routes/lifestyleRoutes.js

const express = require('express');
const router = express.Router();
const lifestyleController = require('../controllers/lifestyleController');
const authenticateUser = require('../middleware/authMiddleware'); // Assure-toi que ce middleware est correctement défini

// Route CREATE (Création d'un mode de vie)
router.post('/', authenticateUser, lifestyleController.createLifestyle);

// Route READ (Récupération du mode de vie d'un utilisateur)
router.get('/:userId', authenticateUser, lifestyleController.getUserLifestyle);

// Route UPDATE (Mise à jour du mode de vie)
router.put('/:userId', authenticateUser, lifestyleController.updateLifestyle);

// Route DELETE (Suppression du mode de vie)
router.delete('/:userId', authenticateUser, lifestyleController.deleteLifestyle);

module.exports = router;
