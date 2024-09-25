// controllers/transactionController.js
const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');

// @desc    Get all transactions for user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ account: req.account.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new transaction (credit or debit)
// @route   POST /api/transactions
// @access  Private
const createTransaction = async (req, res) => {
  const { account, amount, type } = req.body;

  // Validate type
  if (!['credit', 'debit'].includes(type)) {
    return res.status(400).json({ message: 'Invalid transaction type' });
  }

  try {
    // Fetch account
    const accountData = await Account.findById(account);
    if (!accountData || accountData.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Adjust account balance
    let newBalance = accountData.balance;
    if (type === 'credit') {
      newBalance += amount;
    } else if (type === 'debit') {
      if (newBalance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      newBalance -= amount;
    }

    // Save updated account balance
    accountData.balance = newBalance;
    await accountData.save();

    // Create transaction record
    const transaction = new Transaction({
      account: accountData.id,
      amount,
      type,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTransactions, createTransaction };
