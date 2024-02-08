// backend/models/UserProfile.js

const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fitnessGoals: {
    type: String,
  },
  skillsToDevelop: {
    type: String,
  },
  dailyHabits: {
    type: String,
  },
  emotionalWellbeing: {
    type: String,
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
