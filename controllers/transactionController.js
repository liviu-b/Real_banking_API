const mongoose = require('mongoose');
const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { accountId, amount, type } = req.body;

    // Check if the account exists
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if the transaction is a debit and the account has enough balance
    if (type === 'debit' && account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Create the transaction
    const transaction = await Transaction.create({
      account: accountId,
      amount,
      type,
    });

    // Update account balance
    account.balance = type === 'credit' ? account.balance + amount : account.balance - amount;
    await account.save();

    // Return the transaction
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all transactions for an account
const getTransactions = async (req, res) => {
  try {
    const { accountId } = req.query;
    const transactions = await Transaction.find({ account: accountId });

    if (!transactions) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};
