const mongoose = require('mongoose');
const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');

const createTransaction = async (req, res) => {
  try {
    const { accountId, amount, type } = req.body;

    // Ensure accountId is cast as an ObjectId
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      return res.status(400).json({ message: 'Invalid account ID format' });
    }

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
