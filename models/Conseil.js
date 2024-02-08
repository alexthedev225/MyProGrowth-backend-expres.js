// models/Conseil.js

const mongoose = require('mongoose');

const conseilSchema = new mongoose.Schema({
  conseil: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Conseil = mongoose.model('Conseil', conseilSchema);

module.exports = Conseil;
