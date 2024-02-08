// backend/routes/fitnessRoutes.js

const express = require('express');
const router = express.Router();
const fitnessController = require('../controllers/fitnessController');
const authenticateUser = require('../middleware/authMiddleware');

// Route CREATE (Création d'une entrée de condition physique)
router.post('/', authenticateUser, fitnessController.createFitnessEntry);

// Route READ (Récupération des entrées de condition physique d'un utilisateur)
router.get('/:userId', authenticateUser, fitnessController.getUserFitnessEntries);

// Route UPDATE (Mise à jour d'une entrée de condition physique)
router.put('/:entryId', authenticateUser, fitnessController.updateFitnessEntry);

// Route DELETE (Suppression d'une entrée de condition physique)
router.delete('/:entryId', authenticateUser, fitnessController.deleteFitnessEntry);

module.exports = router;
