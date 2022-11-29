const path = require('path');
module.exports = (controller) => {
  const controllersPath = path.join(__dirname, '..', 'controller');
  const controllerPath = path.join(controllersPath, `${controller}`);

  try {
    const Controller = require(controllerPath);
    return Controller.router;
  } catch (error) {
    console.log(error);
  }
};
