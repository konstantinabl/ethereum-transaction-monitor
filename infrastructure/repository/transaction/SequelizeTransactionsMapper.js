const Transaction = require('../../../domain/Transaction');

const SequelizeTransactionsMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      uuid,
      hash,
      block,
      from,
      to,
      value,
      fee,
      gasPrice,
      time,
      confirmations,
      createdAt,
      ruleId,
    } = dataValues;
    return new Transaction({
      id,
      uuid,
      hash,
      block,
      from,
      to,
      value,
      fee,
      gasPrice,
      time,
      confirmations,
      createdAt,
      ruleId,
    });
  },

  toDatabase(transaction) {
    const {
      uuid,
      hash,
      block,
      from,
      to,
      value,
      fee,
      gasPrice,
      time,
      confirmations,
      createdAt,
      ruleId,
    } = transaction;

    return {
      uuid,
      hash,
      block,
      from,
      to,
      value,
      fee,
      gasPrice,
      time,
      confirmations,
      createdAt,
      ruleId,
    };
  },
};

module.exports = SequelizeTransactionsMapper;
