const { DataTypes } = require('sequelize');
const { database } = require('../index');

database.rules = require('./rule')(database, DataTypes);
database.transactions = require('./transaction')(database, DataTypes);

module.exports = database;
