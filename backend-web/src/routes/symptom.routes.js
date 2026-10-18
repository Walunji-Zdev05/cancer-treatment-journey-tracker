const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validators/symptom.validator');
const c = require('../controllers/symptom.controller');

router.use(protect, authorize('admin', 'nurse', 'navigator'));

router.route('/')
  .get(v.list, validate, c.list)
  .post(v.create, validate, c.create);

router.patch('/:id/resolve', v.idParam, validate, c.resolve);

module.exports = router;