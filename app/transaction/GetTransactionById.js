const EventEmitter = require('events');

class GetTransactionById extends EventEmitter {
  constructor({ transactionsRepository }) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  execute(id) {
    this.transactionsRepository
      .findById(id)
      .then((newRule) => {
        this.emit('SUCCESS', newRule);
      })
      .catch((error) => {
        if (error.message === 'ValidationError') {
          return this.emit('VALIDATION_ERROR', error);
        }

        this.emit('ERROR', error);
      });
  }
}

module.exports = GetTransactionById;
