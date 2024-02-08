// backend/models/Lifestyle.js

const mongoose = require('mongoose');

const lifestyleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sleepHours: {
    type: Number,
    required: true,
  },
  dailyExercise: {
    type: Boolean,
    required: true,
  },
  eatingHabits: {
    type: String,
    required: true,
  },
  // Ajoute d'autres propriétés au besoin
});

const Lifestyle = mongoose.model('Lifestyle', lifestyleSchema);

module.exports = Lifestyle;
