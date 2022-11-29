const EventEmitter = require('events');
const serialize = require('serialize-javascript');
const Transaction = require('../../domain/Transaction');

class CreateTransaction extends EventEmitter {
  constructor({ transactionsRepository }) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  execute(transactionData) {
    const transaction = new Transaction(transactionData);
    this.transactionsRepository
      .add(transaction)
      .then((newTransaction) => {
        this.emit('SUCCESS', newTransaction);
      })
      .catch((error) => {
        if (error.message === 'ValidationError') {
          return this.emit('VALIDATION_ERROR', error);
        }

        this.emit('ERROR', error);
      });
  }
}

module.exports = CreateTransaction;
