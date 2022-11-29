const { Router } = require('express');
const initializeController = require('./utils/controllerLoader');
module.exports = () => {
  const router = new Router();
  router.use('/transactions', initializeController('TransactionController'));
  router.use('/rules', initializeController('RulesController'));

  return router;
};
