// backend/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateUser = require('../middleware/authMiddleware');

// Route READ (Récupération des informations centralisées de l'utilisateur)
router.get('/:userId', authenticateUser, dashboardController.getUserDashboard);

module.exports = router;
