'use strict';

/** @type {import('sequelize-cli').Migration} */
const Chance = require('chance');
const chance = new Chance();
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const dummyTransactions = [];
    const oneEther = 1000000000000000000;
    const fourtyEther = 40000000000000000000;
    for (let i = 0; i < 10; i++) {
      dummyTransactions.push({
        uuid: chance.guid({ version: 4 }),
        hash: chance.hash({ length: 50 }),
        block: chance.hash({ length: 60 }),
        from: chance.hash({ length: 40 }),
        to: chance.hash({ length: 50 }),
        value: chance.integer({ min: oneEther, max: fourtyEther }),
        fee: chance.integer({ min: 0, max: oneEther }),
        gasPrice: chance.integer({ min: 0, max: oneEther }),
        confirmations: 1,
        time: new Date(),
        createdAt: new Date(),
        ruleId: chance.integer({ min: 1, max: 10 }),
      });
    }

    return queryInterface.bulkInsert('Transactions', dummyTransactions, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Transactions', null, {});
  },
};
