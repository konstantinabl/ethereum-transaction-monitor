const transactions = require('../controller/transactions.controller');
const transactionsTest = require('../controller/TransactionController');
const router = require('express').Router();

router.get('/', transactions.getAll);

router.post('/', transactionsTest.create);

router.get('/:id', transactions.findById);

module.exports = router;
