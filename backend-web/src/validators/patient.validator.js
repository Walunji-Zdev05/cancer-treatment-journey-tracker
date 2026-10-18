const { body, param, query } = require('express-validator');
const { normalizePhone } = require('../utils/phone');

const phoneRule = (field) =>
  body(field).customSanitizer(normalizePhone)
    .matches(/^\+265\d{9}$/).withMessage('Use a valid Malawi number, e.g. 0999123456');

exports.idParam = [param('id').isMongoId().withMessage('Invalid patient id')];

exports.create = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  phoneRule('phone'),
  body('caregiverPhone').optional({ values: 'falsy' }).customSanitizer(normalizePhone)
    .matches(/^\+265\d{9}$/).withMessage('Invalid caregiver number'),
  body('sex').optional().isIn(['female', 'male']),
  body('dateOfBirth').optional().isISO8601().toDate(),
  body('preferredLanguage').optional().isIn(['en', 'ny', 'tum']),
  body('cancerType').trim().notEmpty().withMessage('Cancer type is required'),
  body('treatmentStartDate').isISO8601().withMessage('Valid start date required').toDate(),
  body('plannedCycles').optional().isInt({ min: 1, max: 40 }).toInt(),
  body('consentSms').optional().isBoolean().toBoolean(),
];

exports.update = [
  ...exports.idParam,
  body('phone').optional().customSanitizer(normalizePhone)
    .matches(/^\+265\d{9}$/).withMessage('Invalid phone'),
  body('status').optional().isIn(['active', 'completed', 'abandoned', 'transferred', 'deceased']),
  body('consentSms').optional().isBoolean().toBoolean(),
];

exports.list = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('status').optional().isIn(['active', 'completed', 'abandoned', 'transferred', 'deceased']),
];