const express = require('express');
const { createTransaction, getTransactions } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes
router.route('/').post(protect, createTransaction).get(protect, getTransactions);

module.exports = router;
