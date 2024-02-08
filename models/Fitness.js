// backend/models/Fitness.js

const mongoose = require('mongoose');

const fitnessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // Ajoute d'autres propriétés au besoin
});

const Fitness = mongoose.model('Fitness', fitnessSchema);

module.exports = Fitness;
