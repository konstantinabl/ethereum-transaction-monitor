"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Rule, {
        foreignKey: "ruleId",
        as: "rule",
      });
    }
  }
  Transaction.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      block: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      fee: {
        type: DataTypes.BIGINT,
      },
      gasPrice: { type: DataTypes.BIGINT },
      time: { type: DataTypes.DATE },
      confirmations: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      ruleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
      updatedAt: false,
    }
  );
  return Transaction;
};
