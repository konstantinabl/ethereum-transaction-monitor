'use strict';
const { rules } = require('../infrastructure/database/models');
const TransactionDomain = require('../domain/Transaction');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const ethers = require('ethers');
class TransactionMonitor {
  constructor(logger, transactionsRepository, rulesRepository) {
    this.logger = logger;
    this.transactionsRepository = transactionsRepository;
    this.rulesRepository = rulesRepository;
  }
  infuraUrl = process.env.INFURA_ADDRESS;
  latestRule;
  provider = new ethers.providers.JsonRpcProvider(this.infuraUrl);
  async start() {
    await this.getLatestRule();
    this.provider.on('block', async (blockNumber) => {
      const block = await this.getBlockByNumber(blockNumber);
      const transactions = block.transactions;
      if (this.latestRule) {
        transactions.forEach(async (hash) => {
          let transaction = await this.getTransactionByHash(hash);
          const valid = this.isTransactionValid(transaction);
          if (valid) {
            this.saveTransaction(transaction, this.latestRule.id);
          }
        });
      } else {
        this.logger.info('No existing rules.');
      }
    });
  }
  async getLatestRule() {
    try {
      const sth = await this.rulesRepository.findLatest({
        where: {},
        order: [['createdAt', 'DESC']],
      });
      const {
        id,
        uuid,
        minTransactionValue,
        maxTransactionValue,
        from,
        to,
        minConfirmations,
        autho,
        createdAt,
      } = sth.attributes;

      this.latestRule = {
        id,
        uuid,
        minTransactionValue,
        maxTransactionValue,
        from,
        to,
        minConfirmations,
        autho,
        createdAt,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  saveTransaction(transaction, ruleId) {
    const transaction_model = {
      uuid: uuidv4(),
      hash: transaction.hash,
      block: transaction.blockHash,
      from: transaction.from,
      to: transaction.to || 'some address',
      value: Number(transaction.value),
      fee: Number(transaction.maxFeePerGas) || 0,
      gasPrice: Number(transaction.gasPrice),
      time: new Date().toISOString(),
      confirmations: transaction.confirmations,
      createdAt: new Date().toISOString(),
      updatedAt: '2022-11-22 22:56:53.895',
      ruleId: ruleId,
    };
    const transactionDomain = new TransactionDomain(transaction_model);
    this.transactionsRepository.add(transactionDomain);
  }
  async getBlockByNumber(blockNumber) {
    try {
      const block = await this.provider.getBlock(blockNumber);
      return block;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getTransactionByHash(hash) {
    try {
      const transaction = await this.provider.getTransaction(hash);
      return transaction;
    } catch (error) {
      this.logger.error(error);
    }
  }

  isTransactionValid(transaction) {
    const {
      minTransactionValue,
      maxTransactionValue,
      minConfirmations,
      from,
      to,
    } = this.latestRule;
    const value = Number(transaction.value);
    const transactionConfirmation = Number(transaction.confirmations);
    if (value < minTransactionValue) {
      return false;
    } else if (value > maxTransactionValue) {
      return false;
    } else if (minConfirmations && minConfirmations > transactionConfirmation) {
      return false;
    } else if (from && from != transaction.from) {
      return false;
    } else if (to && to != transaction.to) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = TransactionMonitor;
