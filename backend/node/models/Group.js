const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  email: {
    type: String, // Changed from Number to String
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense',
  }],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, 
  },
  seuil: {
    type: Number,
    required: false,
    default: 0,
  },
  telephone: {
    type: Number,
    required: false,
    default: 0,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
});

module.exports = mongoose.model('Group', groupSchema);
