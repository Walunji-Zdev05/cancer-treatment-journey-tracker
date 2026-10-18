const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validators/auth.validator');
const c = require('../controllers/auth.controller');

router.post('/login', v.login, validate, c.login);
router.post('/register', protect, authorize('admin'), v.register, validate, c.register);

module.exports = router;