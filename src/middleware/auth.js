const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user');

exports.verifyUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.json({
        status: 'error',
        msg: 'You are not loggedin',
      }).status(401);
    }

    const token = req.headers.authorization.split(' ')[1];
    const verifyToken = promisify(jwt.verify);

    const { id } = await verifyToken(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (err) {
    res.json({ status: 'error', msg: err.message });
  }
};
