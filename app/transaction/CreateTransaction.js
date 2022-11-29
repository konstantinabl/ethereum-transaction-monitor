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
    console.log('Data', transactionData);
    console.log(transaction.attributes);
    console.log(transaction);
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
