const { attributes } = require('structure');

const Transaction = attributes({
  id: Number,
  uuid: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  gasPrice: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  ruleId: {
    type: Number,
    required: true,
  },
})(
  class Transaction {
    isLegal() {
      return true;
    }
  }
);

Transaction.MIN_ID = 0;

module.exports = Transaction;
