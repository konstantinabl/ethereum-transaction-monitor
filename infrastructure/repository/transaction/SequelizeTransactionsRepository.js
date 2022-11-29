'use strict';
const TransactionMapper = require('./SequelizeTransactionsMapper');
class SequelizeTransactionsRepository {
  constructor(TransactionModel) {
    this.TransactionModel = TransactionModel;
  }

  async add(transaction) {
    const { valid, error } = transaction.validate();
    if (!valid) {
      const error = new Error('ValidationError');
      throw error;
    }

    let newTransaction;
    try {
      newTransaction = await this.TransactionModel.create(
        TransactionMapper.toDatabase(transaction.attributes)
      );
    } catch (error) {
      throw error;
    }

    return TransactionMapper.toEntity(newTransaction);
  }

  async getAll() {
    let transactions;
    try {
      transactions = await this.TransactionModel.findAll();
      return transactions.map(TransactionMapper.toEntity);
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    let transaction;
    try {
      transaction = await this.TransactionModel.findByPk(id);
      return TransactionMapper.toEntity(transaction);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SequelizeTransactionsRepository;
