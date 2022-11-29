const { configure, getLogger } = require('log4js');
const config = require('../config/index');
configure(config.logging);

const logger = getLogger();

module.exports = () => {
  return logger;
};
