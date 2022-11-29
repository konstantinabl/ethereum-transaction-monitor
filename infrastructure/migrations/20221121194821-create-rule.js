"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Rules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
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
      author: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Rules");
  },
};
