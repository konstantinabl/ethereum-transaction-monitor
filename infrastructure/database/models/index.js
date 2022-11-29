const { DataTypes } = require('sequelize');
const { database } = require('../index');

database.rules = require('./rule')(database, DataTypes);
database.transactions = require('./transaction')(database, DataTypes);
console.log('Db container', database.transactions);
module.exports = database;
// const { ModelsLoader } = require('../../sequelize');
// const Sequelize = require('sequelize');
// const config = require('../config/db.config');
// const env = 'development';
// if (config) {
//   const sequelize = new Sequelize(config[env]);
//   console.log(sequelize);
//   module.exports = ModelsLoader.load({
//     sequelize,
//     baseFolder: __dirname,
//   });
// } else {
//   /* eslint-disable no-console */
//   console.error('Database config file log found, disabling database.');
//   /* eslint-enable no-console */
// }
