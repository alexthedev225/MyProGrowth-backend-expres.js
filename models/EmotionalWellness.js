// backend/models/EmotionalWellness.js

const mongoose = require('mongoose');

const emotionalWellnessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  entryDate: {
    type: Date,
    required: true,
  },
  emotion: {
    type: String,
    required: true,
  },
  moodDescription: {
    type: String,
    required: true,
  },
  // Ajoute d'autres propriétés au besoin
});

const EmotionalWellness = mongoose.model('EmotionalWellness', emotionalWellnessSchema);

module.exports = EmotionalWellness;
