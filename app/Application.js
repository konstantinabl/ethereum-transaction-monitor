'use strict';
class Application {
  constructor(server, database, monitor, logger) {
    this.server = server;
    this.database = database;
    this.monitor = monitor;
    this.logger = logger;
  }

  async start() {
    if (this.database) {
      await this.database.authenticate();
      this.logger.info('Connected to DB');
    }
    await this.server.start();
    await this.monitor.start();
  }
}

module.exports = Application;
