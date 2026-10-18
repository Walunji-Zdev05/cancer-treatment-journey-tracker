const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validators/appointment.validator');
const c = require('../controllers/appointment.controller');

router.use(protect, authorize('admin', 'nurse', 'navigator'));
router.post('/', v.create, validate, c.create);
router.patch('/:id', v.update, validate, c.update);

module.exports = router;