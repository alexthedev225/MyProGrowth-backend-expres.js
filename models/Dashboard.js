// backend/models/Dashboard.js

const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Ajoute d'autres propriétés pour les informations centralisées au besoin
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
