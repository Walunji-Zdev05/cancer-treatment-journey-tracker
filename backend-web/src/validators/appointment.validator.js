const { body, param } = require('express-validator');

exports.create = [
  body('patient').isMongoId().withMessage('Valid patient id required'),
  body('type').isIn(['chemotherapy', 'radiation', 'review', 'lab']),
  body('scheduledDate').isISO8601().withMessage('Valid date required').toDate(),
  body('notes').optional().isString().isLength({ max: 500 }),
];

exports.update = [
  param('id').isMongoId(),
  body('status').optional().isIn(['scheduled', 'attended', 'missed', 'rescheduled']),
  body('followedUp').optional().isBoolean().toBoolean(),
  body('scheduledDate').optional().isISO8601().toDate(),
];