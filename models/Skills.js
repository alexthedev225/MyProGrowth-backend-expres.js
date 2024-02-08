// backend/models/Skills.js

const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skillName: {
    type: String,
    required: true,
  },
  skillLevel: {
    type: String,
    required: true,
  },
  // Ajoute d'autres propriétés au besoin
});

const Skills = mongoose.model('Skills', skillsSchema);

module.exports = Skills;
