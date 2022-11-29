const Rule = require('../../../domain/Rule');

const SequelizeRulesMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      uuid,
      minTransactionValue,
      maxTransactionValue,
      from,
      to,
      minConfirmations,
      author,
      createdAt,
    } = dataValues;
    return new Rule({
      id,
      uuid,
      minTransactionValue,
      maxTransactionValue,
      from,
      to,
      minConfirmations,
      author,
      createdAt,
    });
  },

  toDatabase(rule) {
    const {
      uuid,
      minTransactionValue,
      maxTransactionValue,
      from,
      to,
      minConfirmations,
      author,
      createdAt,
    } = rule;

    return {
      uuid,
      minTransactionValue,
      maxTransactionValue,
      from,
      to,
      minConfirmations,
      author,
      createdAt,
    };
  },
};

module.exports = SequelizeRulesMapper;
