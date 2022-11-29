const EventEmitter = require('events');

class UpdateRule extends EventEmitter {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  execute(data, id) {
    console.log(data, id);
    this.rulesRepository
      .update(data, id)
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

module.exports = UpdateRule;
