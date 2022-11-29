const rules = require('../controller/rules.controller');
const router = require('express').Router();
const rulesTest = require('../controller/RulesController');

router.post('/', rulesTest.create);

router.get('/', rulesTest.index);

router.get('/:id', rulesTest.getById);

router.put('/:id', rules.update);

router.delete('/:id', rules.delete);

module.exports = router;
