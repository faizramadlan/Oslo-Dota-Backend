const { AppError } = require('../helpers/CustomErrors');

function errorHandler(err, req, res, next) {
  // If it's one of our custom AppErrors, it already has a statusCode
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Handle specific Sequelize or JWT errors by mapping them
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
    case 'ValidationError':
      const errors = Object.values(err.errors || []).map((error) => error.message);
      return res.status(400).json({ message: 'Validation Error', errors });

    case 'JsonWebTokenError':
    case 'TokenExpiredError':
      return res.status(401).json({ message: 'Invalid or Expired Token' });

    default:
      // Keep old string matching for legacy transition until fully refactored
      if (err.name === 'BadRequest') return res.status(400).json({ message: err.message || 'Bad Request' });
      if (err.name === 'Unauthorized' || err.name === 'UnauthorizedError') return res.status(401).json({ message: err.message || 'Unauthorized Access' });
      if (err.name === 'NotFound') return res.status(404).json({ message: err.message || 'Not Found' });

      console.error('Unhandled Error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { errorHandler };