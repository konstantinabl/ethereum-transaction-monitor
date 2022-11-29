const EventEmitter = require('events');
const Rule = require('../../domain/Rule');

class CreateRule extends EventEmitter {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  execute(ruleData) {
    const rule = new Rule(ruleData);
    this.rulesRepository
      .add(rule)
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

module.exports = CreateRule;
