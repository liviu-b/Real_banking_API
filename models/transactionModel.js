const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
