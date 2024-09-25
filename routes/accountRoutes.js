const express = require('express');
const { getAccounts, createAccount } = require('../controllers/accountController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes
router.route('/').get(protect, getAccounts).post(protect, createAccount);

module.exports = router;
