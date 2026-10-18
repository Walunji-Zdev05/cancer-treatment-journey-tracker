const { body, param, query } = require('express-validator');

exports.create = [
  body('patient').isMongoId().withMessage('Valid patient id required'),
  body('symptom')
    .isIn(['nausea', 'pain', 'fever', 'fatigue', 'bleeding', 'appetite_loss', 'other'])
    .withMessage('Invalid symptom'),
  body('severity').isInt({ min: 1, max: 3 }).withMessage('Severity must be 1, 2 or 3').toInt(),
];

exports.list = [
  query('resolved').optional().isBoolean(),
  query('severity').optional().isIn(['1', '2', '3']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
];

exports.idParam = [param('id').isMongoId().withMessage('Invalid report id')];