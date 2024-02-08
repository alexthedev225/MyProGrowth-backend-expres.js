// backend/routes/emotionalWellnessRoutes.js

const express = require('express');
const router = express.Router();
const emotionalWellnessController = require('../controllers/emotionalWellnessController');
const authenticateUser = require('../middleware/authMiddleware');

// Route CREATE (Création d'un journal de bien-être émotionnel)
router.post('/', authenticateUser, emotionalWellnessController.createEmotionalWellnessEntry);

// Route READ (Récupération des journaux de bien-être émotionnel d'un utilisateur)
router.get('/:userId', authenticateUser, emotionalWellnessController.getUserEmotionalWellnessEntries);

// Route UPDATE (Mise à jour d'un journal de bien-être émotionnel)
router.put('/:entryId', authenticateUser, emotionalWellnessController.updateEmotionalWellnessEntry);

// Route DELETE (Suppression d'un journal de bien-être émotionnel)
router.delete('/:entryId', authenticateUser, emotionalWellnessController.deleteEmotionalWellnessEntry);

module.exports = router;
