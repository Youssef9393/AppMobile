const mongoose = require('mongoose');
//la expensve contient tous les information sur les transaction tel que nom de transaction
////amount et description user qui a fait cette transaction et le qrope qu'il appartient
const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groupId: {  
    type: mongoose.Schema.Types.ObjectId,
    required: true,  
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Expense', expenseSchema);
