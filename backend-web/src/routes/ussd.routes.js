const router = require('express').Router();
const ussdAuth = require('../middleware/ussdAuth');
const { handle } = require('../controllers/ussd.controller');

router.post('/', ussdAuth, handle);

module.exports = router;