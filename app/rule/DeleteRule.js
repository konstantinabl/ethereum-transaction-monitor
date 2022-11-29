const EventEmitter = require('events');

class DeleteRule extends EventEmitter {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  execute(id) {
    this.rulesRepository
      .delete(id)
      .then((rule) => {
        this.emit('SUCCESS', rule);
      })
      .catch((error) => {
        if (error.message === 'ValidationError') {
          return this.emit('VALIDATION_ERROR', error);
        }

        this.emit('ERROR', error);
      });
  }
}

module.exports = DeleteRule;
