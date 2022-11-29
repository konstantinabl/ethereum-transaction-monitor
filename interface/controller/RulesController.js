const CreateRule = require('../../app/rule/CreateRule');
const GetAllRules = require('../../app/rule/GetAllRules');
const GetRuleById = require('../../app/rule/GetRuleById');
const UpdateRule = require('../../app/rule/UpdateRule');
const DeleteRule = require('../../app/rule/DeleteRule');
const RuleModel = require('../../infrastructure/database/models/index').rules;
const rulesRepo = require('../../infrastructure/repository/rule/SeqeulizeRulesRepository');
const router = require('express').Router();
const RulesController = {
  get router() {
    router.post('/', this.create);

    router.get('/', this.index);

    router.get('/:id', this.getById);

    router.put('/:id', this.update);

    router.delete('/:id', this.delete);

    return router;
  },
  create(req, res) {
    rulesRepository = new rulesRepo(RuleModel);
    const createRule = new CreateRule({ rulesRepository });
    createRule
      .on('SUCCESS', (rule) => {
        res.status(201).json(rule);
      })
      .on('VALIDATION_ERROR', (error) => {
        res.status(400).json({
          type: 'ValidationError',
          details: error.details,
        });
      })
      .on('ERROR', (error) => {
        res.sendStatus(500);
      });
    createRule.execute(req.body);
  },
  index(req, res, next) {
    rulesRepository = new rulesRepo(RuleModel);
    const getAllRules = new GetAllRules({ rulesRepository });
    getAllRules
      .on('SUCCESS', (rules) => {
        res.status(200).json(rules);
      })
      .on('ERROR', next);

    getAllRules.execute();
  },
  getById(req, res, next) {
    rulesRepository = new rulesRepo(RuleModel);
    const getRuleById = new GetRuleById({ rulesRepository });
    getRuleById
      .on('SUCCESS', (rules) => {
        res.status(200).json(rules);
      })
      .on('ERROR', next);

    getRuleById.execute(req.params.id);
  },
  update(req, res, next) {
    rulesRepository = new rulesRepo(RuleModel);
    const updateRule = new UpdateRule({ rulesRepository });
    updateRule
      .on('SUCCESS', (rules) => {
        res.status(200).json(rules);
      })
      .on('ERROR', next);
    console.log('ID PARAM', req.params.id);
    updateRule.execute(req.body, req.params.id);
  },
  delete(req, res, next) {
    rulesRepository = new rulesRepo(RuleModel);
    const deleteRule = new DeleteRule({ rulesRepository });
    deleteRule
      .on('SUCCESS', (rules) => {
        res.status(200).json(rules);
      })
      .on('ERROR', next);

    deleteRule.execute(req.params.id);
  },
};

module.exports = RulesController;
