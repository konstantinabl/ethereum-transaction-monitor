const dbConfig = require('./config/db.config');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const config = dbConfig[env];
console.log(config);
console.log(dbConfig.development);
if (!config) {
  throw new Error('Database configuration not found');
}

const sequelizeDatabase = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = { database: sequelizeDatabase, sequelize: Sequelize };
