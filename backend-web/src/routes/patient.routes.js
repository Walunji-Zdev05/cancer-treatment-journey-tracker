const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validators/patient.validator');
const c = require('../controllers/patient.controller');
const appt = require('../controllers/appointment.controller');

router.use(protect);

router.route('/')
  .get(v.list, validate, c.list)
  .post(authorize('admin', 'nurse', 'navigator'), v.create, validate, c.create);

router.route('/:id')
  .get(v.idParam, validate, c.getOne)
  .patch(authorize('admin', 'nurse', 'navigator'), v.update, validate, c.update);

router.get('/:patientId/appointments', appt.listForPatient);

module.exports = router;