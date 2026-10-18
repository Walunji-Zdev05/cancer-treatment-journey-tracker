const { getAtRisk } = require('../services/risk.service');

exports.atRisk = async (req, res) => {
  const facility = req.user.role === 'admin' ? req.query.facility : req.user.facility;
  const list = await getAtRisk(facility);
  res.json({ date: new Date(), count: list.length, items: list });
};