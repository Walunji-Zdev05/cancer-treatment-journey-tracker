exports.notFound = (req, res) =>
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });

exports.errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Server error';

  if (err.name === 'ValidationError') {
    status = 422;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }
  if (err.name === 'CastError') { status = 400; message = `Invalid ${err.path}`; }
  if (err.code === 11000) {
    status = 409;
    message = `Duplicate value for: ${Object.keys(err.keyValue).join(', ')}`;
  }

  if (status === 500) console.error(err);
  if (status === 500 && process.env.NODE_ENV === 'production') message = 'Server error';

  res.status(status).json({ message });
};