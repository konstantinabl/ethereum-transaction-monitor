'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rule.hasMany(models.Transaction, {
        as: 'transactions',
      });
    }
  }
  Rule.init(
    {
      uuid: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      minTransactionValue: { type: DataTypes.STRING, allowNull: false },
      maxTransactionValue: { type: DataTypes.STRING, allowNull: false },
      from: { type: DataTypes.STRING },
      to: {
        type: DataTypes.STRING,
      },
      minConfirmations: { type: DataTypes.INTEGER },
      author: { type: DataTypes.STRING, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Rule',
      updatedAt: false,
    }
  );
  return Rule;
};
