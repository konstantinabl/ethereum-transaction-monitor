"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      hash: {
        type: DataTypes.STRING,
      },
      block: {
        type: DataTypes.STRING,
      },
      from: {
        type: DataTypes.STRING,
      },
      to: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.STRING,
      },
      fee: {
        type: DataTypes.BIGINT,
      },
      gasPrice: {
        type: DataTypes.BIGINT,
      },
      time: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      confirmations: {
        type: DataTypes.INTEGER,
      },
      ruleId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Rules",
          },
          key: "id",
        },
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Transactions");
  },
};
