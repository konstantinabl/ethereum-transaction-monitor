"use strict";

/** @type {import('sequelize-cli').Migration} */
const Chance = require("chance");
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
    const dummyRules = [];
    const oneEther = 1000000000000000000;
    const threeEther = 3000000000000000000;
    const thirtyEther = 30000000000000000000;
    const fourtyEther = 40000000000000000000;
    for (let i = 0; i < 10; i++) {
      dummyRules.push({
        uuid: chance.guid({ version: 4 }),
        minTransactionValue: chance.integer({ min: oneEther, max: threeEther }),
        maxTransactionValue: chance.integer({
          min: thirtyEther,
          max: fourtyEther,
        }),
        minConfirmations: chance.integer({ min: 1, max: 3 }),
        from: chance.hash({ length: 40 }),
        to: chance.hash({ length: 40 }),
        author: chance.name(),
        createdAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Rules", dummyRules, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Rules", null, {});
  },
};
