const crypto = require('crypto');

module.exports = (req, res, next) => {
  const expected = Buffer.from(process.env.USSD_SECRET || '');
  const given = Buffer.from(String(req.query.key || ''));

  const ok = expected.length > 0 &&
    given.length === expected.length &&
    crypto.timingSafeEqual(given, expected);

  if (!ok) return res.status(403).type('text/plain').send('END Not allowed');
  next();
};