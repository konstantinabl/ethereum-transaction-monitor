const path = require('path');
const logger = require('../../logger/logger');
module.exports = (controller) => {
  const controllersPath = path.join(__dirname, '..', 'controller');
  const controllerPath = path.join(controllersPath, `${controller}`);

  try {
    const Controller = require(controllerPath);
    return Controller.router;
  } catch (error) {
    logger.error(error);
  }
};
