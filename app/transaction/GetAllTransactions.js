const EventEmitter = require('events');

class GetAllTransactions extends EventEmitter {
  constructor({ transactionsRepository }) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  execute() {
    this.transactionsRepository
      .getAll()
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

module.exports = GetAllTransactions;
