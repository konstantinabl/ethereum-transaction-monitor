const {
  createContainer,
  asFunction,
  asClass,
  asValue,
  InjectionMode,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('./config');
const Application = require('./app/Application');
const {
  CreateRule,
  GetAllRules,
  UpdateRule,
  GetRuleById,
  DeleteRule,
} = require('./app/rule');

const {
  CreateTransaction,
  GetAllTransactions,
  GetTransactionById,
} = require('./app/transaction');

const Server = require('./interface/Server');
const TransactionMonitor = require('./interface/TransactionMonitor');
const router = require('./interface/routes');

const SequelizeTransactionsRepository = require('./infrastructure/repository/transaction/SequelizeTransactionsRepository');
const SequelizeRulesRepository = require('./infrastructure/repository/rule/SeqeulizeRulesRepository');

const database = require('./infrastructure/database/models');

const logger = require('./logger/logger');
const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});
container.register({
  app: asClass(Application).singleton(),
  server: asClass(Server).singleton(),
  monitor: asClass(TransactionMonitor).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger).singleton(),

  config: asValue(config),
  containerMiddleware: asValue(scopePerRequest(container)),

  rulesRepository: asClass(SequelizeRulesRepository).singleton(),
  transactionsRepository: asClass(SequelizeTransactionsRepository).singleton(),

  database: asValue(database),
  RuleModel: asValue(database.rules),
  TransactionModel: asValue(database.transactions),

  createTransaction: asClass(CreateTransaction),
  getAllTransactions: asClass(GetAllTransactions),
  getTransactionById: asClass(GetTransactionById),

  createRule: asClass(CreateRule),
  getAllRules: asClass(GetAllRules),
  getRule: asClass(GetRuleById),
  updateRule: asClass(UpdateRule),
  deleteRule: asClass(DeleteRule),
});

module.exports = container;
