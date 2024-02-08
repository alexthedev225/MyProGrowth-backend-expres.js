// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

// Crée un profil utilisateur
router.post('/create-profile', authenticateUser, userController.createUserProfile);

// Obtient le profil utilisateur d'un utilisateur spécifique
router.get('/user-profile/:userId', authenticateUser, userController.getUserProfile);
router.get('/:userId/conseils', authenticateUser ,userController.getUserConseils);

module.exports = router;
