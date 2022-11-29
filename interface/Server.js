'use strict';
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
class Server {
  constructor(logger, router, config) {
    this.logger = logger;
    this.router = router;
    this.config = config;
    this.app = express();
  }

  start() {
    this.configure();
    return new Promise((resolve) => {
      const http = this.app.listen(8081, () => {
        const { port } = http.address();
        this.logger.info(`Server is running on port ${port}`);
        resolve();
      });
    });
  }

  configure() {
    this.app
      .use(
        morgan('tiny', {
          stream: this.logger.info('ok'),
        })
      )
      .use(express.json())
      .use(cors({ origin: process.env.ORIGIN }))
      .use(express.urlencoded({ extended: true }))
      .use(routes());
  }
}

module.exports = Server;
