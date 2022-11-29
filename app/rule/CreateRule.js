const EventEmitter = require('events');
const serialize = require('serialize-javascript');
const Rule = require('../../domain/Rule');

class CreateRule extends EventEmitter {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  execute(ruleData) {
    console.log('Rule Data', ruleData);
    const rule = new Rule(ruleData);
    console.log('Rule in create rule', rule);
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
