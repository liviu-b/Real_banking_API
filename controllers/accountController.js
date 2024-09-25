// controllers/accountController.js
const Account = require('../models/accountModel');

// @desc    Get user's accounts
// @route   GET /api/accounts
// @access  Private
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new account for user
// @route   POST /api/accounts
// @access  Private
const createAccount = async (req, res) => {
  const { accountType } = req.body;

  // Ensure valid account type
  if (!['savings', 'checking'].includes(accountType)) {
    return res.status(400).json({ message: 'Invalid account type' });
  }

  try {
    const account = new Account({
      user: req.user.id,
      accountType,
    });

    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAccounts, createAccount };
