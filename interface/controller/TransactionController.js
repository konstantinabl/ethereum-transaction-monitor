const CreateTransaction = require('../../app/transaction/CreateTransaction');
const GetAllTransactions = require('../../app/transaction/GetAllTransactions');
const TransactionModel =
  require('../../infrastructure/database/models/index').transactions;
const transactionsRepo = require('../../infrastructure/repository/transaction/SequelizeTransactionsRepository');
const router = require('express').Router();
const TransactionsController = {
  get router() {
    router.get('/', this.getAll);

    router.post('/', this.create);

    router.get('/:id', this.getById);

    return router;
  },
  create(req, res) {
    transactionsRepository = new transactionsRepo(TransactionModel);
    const createTransaction = new CreateTransaction({ transactionsRepository });
    createTransaction
      .on('SUCCESS', (rule) => {
        res.status(201).json(rule);
      })
      .on('VALIDATION_ERROR', (error) => {
        res.status(400).json({
          type: 'ValidationError',
          details: error.details,
        });
      })
      .on('ERROR', (error) => {
        res.sendStatus(500);
      });
    createTransaction.execute(req.body);
  },
  getAll(req, res, next) {
    transactionsRepository = new transactionsRepo(TransactionModel);
    const getAllTransactions = new GetAllTransactions({
      transactionsRepository,
    });
    getAllTransactions
      .on('SUCCESS', (rules) => {
        res.status(200).json(rules);
      })
      .on('ERROR', next);

    getAllTransactions.execute();
  },
  getById(req, res, next) {
    transactionsRepository = new transactionsRepo(TransactionModel);
    const getRuleById = new GetRuleById({ transactionsRepository });
    getRuleById
      .on('SUCCESS', (rules) => {
        res.status(200).json(rules);
      })
      .on('ERROR', next);

    getRuleById.execute(req.params.id);
  },
};

module.exports = TransactionsController;
