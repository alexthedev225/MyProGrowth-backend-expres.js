// routes/conseilRoutes.js

const express = require('express');
const router = express.Router();
const conseilController = require('../controllers/conseilController');
const authenticateUser = require('../middleware/authMiddleware');

// Récupère un conseil aléatoire
router.get('/conseils/aleatoire', conseilController.getConseilAleatoire);

// Ajoute un nouveau conseil
router.post('/conseils',authenticateUser, conseilController.createConseil);

// Récupère un conseil spécifique par son ID
router.get('/conseils/:id',authenticateUser, conseilController.getConseilById);

// Met à jour un conseil existant par son ID
router.put('/conseils/:id',authenticateUser, conseilController.updateConseilById);

// Supprime un conseil existant par son ID
router.delete('/conseils/:id',authenticateUser, conseilController.deleteConseilById);

module.exports = router;
