const { attributes } = require('structure');

const Rule = attributes({
  id: Number,
  uuid: {
    type: String,
  },
  minTransactionValue: {
    type: String,
    required: true,
  },
  maxTransactionValue: {
    type: String,
    required: true,
  },
  from: { type: String },
  to: { type: String },
  minConfirmations: {
    type: Number,
    default: 1,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
})(
  class Rule {
    isLegal() {
      return true;
    }
  }
);

module.exports = Rule;
