const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');

// Create a new transaction
const createTransaction = async (req, res) => {
  const { accountId, amount, type } = req.body;

  const account = await Account.findById(accountId);

  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }

  if (type === 'debit' && account.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  const transaction = await Transaction.create({
    account: accountId,
    amount,
    type,
  });

  // Update account balance
  account.balance = type === 'credit' ? account.balance + amount : account.balance - amount;
  await account.save();

  res.status(201).json(transaction);
};

// Get all transactions for an account
const getTransactions = async (req, res) => {
  const { accountId } = req.query;

  const transactions = await Transaction.find({ account: accountId });
  res.json(transactions);
};

module.exports = {
  createTransaction,
  getTransactions,
};
