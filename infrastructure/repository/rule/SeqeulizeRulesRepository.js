'use strict';
const RuleMapper = require('./SequelizeRulesMapper');
class SequelizeRulesRepository {
  constructor(RuleModel) {
    this.RuleModel = RuleModel;
  }

  async add(rule) {
    const { valid, error } = rule.validate();
    if (!valid) {
      const error = new Error('ValidationError');

      throw error;
    }
    const newRule = await this.RuleModel.create(
      RuleMapper.toDatabase(rule.attributes)
    );

    return RuleMapper.toEntity(newRule);
  }

  async getAll() {
    let rules;
    try {
      rules = await this.RuleModel.findAll();
      return rules.map(RuleMapper.toEntity);
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    let rule;
    try {
      rule = await this.RuleModel.findOne({
        where: { id: id },
        returning: true,
      });
      if (rule === null) {
        throw new Error('Coulnd"t find record');
      }
    } catch (error) {
      throw error;
    }

    return RuleMapper.toEntity(rule);
  }

  async findLatest() {
    const rule = await this.RuleModel.findOne({
      where: {},
      order: [['createdAt', 'DESC']],
    });

    return RuleMapper.toEntity(rule);
  }

  async update(data, id) {
    let rule;
    try {
      rule = await this.RuleModel.update(data, {
        where: { id: id },
        returning: true,
      });
      if (rule[0] === 0) {
        throw new Error('Could not update record.');
      }
      return RuleMapper.toEntity(rule[1][0]);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    await this.RuleModel.destroy({
      where: { id: id },
    });
    return;
  }
}

module.exports = SequelizeRulesRepository;
