const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Route POST pour créer une dépense
router.post('/', async (req, res) => {
  try {
    const { name, amount, user, description } = req.body;

    if (!name || !amount || !user) {
      return res.status(400).json({ message: 'Name, amount, and user are required' });
    }
    const newExpense = new Expense({
      name,
      amount,
      date: new Date(),
      user,
      description,
    });
    await newExpense.save();
    res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense', error: error.message });
  }
});

module.exports = router;
