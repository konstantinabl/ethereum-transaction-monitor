//const container = require('src/container');
// const logger = require('./logger/logger');
// const config = require('./config/index');
// const router = require('./interface/routes');
// const { transactions } = require('./infrastructure/database/models/index');
// const TransactionRepository = require('./infrastructure/repository/transaction/SequelizeTransactionsRepository');
// const { rules } = require('./infrastructure/database/models/index');
// const RulesRepository = require('./infrastructure/repository/rule/SeqeulizeRulesRepository');
// const rulesRepository = new RulesRepository(rules);
// const transactionsRepository = new TransactionRepository(transactions);
// const App = require('./app/Application');
// const Server = require('./interface/Server');
// const server = new Server(logger, router, config);
// const { database } = require('./infrastructure/database');
// const TransactionMonitor = require('./interface/TransactionMonitor');
// const monitor = new TransactionMonitor(
//   logger,
//   transactionsRepository,
//   rulesRepository
// );
// const application = new App(server, database, monitor, logger);

const container = require('./container');

const app = container.resolve('app');

app.start().catch((error) => {
  console.error(error.stack);
  process.exit();
});
