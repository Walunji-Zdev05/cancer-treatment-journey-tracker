const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/dashboard.controller');

router.get('/at-risk', protect, authorize('admin', 'nurse', 'navigator'), c.atRisk);

module.exports = router;