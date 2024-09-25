const Account = require('../models/accountModel');

// Get all accounts for a user
const getAccounts = async (req, res) => {
  const accounts = await Account.find({ user: req.user._id });
  res.json(accounts);
};

// Create a new account
const createAccount = async (req, res) => {
  const { accountType, initialDeposit } = req.body;

  const account = await Account.create({
    user: req.user._id,
    balance: initialDeposit || 0,
    accountType,
  });

  if (account) {
    res.status(201).json(account);
  } else {
    res.status(400).json({ message: 'Invalid account data' });
  }
};

module.exports = {
  getAccounts,
  createAccount,
};
