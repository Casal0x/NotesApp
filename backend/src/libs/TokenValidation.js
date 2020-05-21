const jwt = require('jsonwebtoken');
const { ERROR } = require('../constants/response.constants');

const TokenValidation = (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY || 'secrettoken';
  try {
    const token = req.header('auth-token');
    if (!token)
      return res.status(401).json({
        status: 'error',
        error: 'Invalid Token',
      });

    const payload = jwt.verify(token, SECRET_KEY);
    req._id = payload._id;

    next();
  } catch (error) {
    res.status(401).json({
      status: ERROR,
      error,
    });
  }
};

module.exports = TokenValidation;
