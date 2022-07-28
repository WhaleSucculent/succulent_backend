import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Customer from '../models/Customer.js';

// @desc Middleware for checking if customer is logged in
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // select except password
      req.customer = await Customer.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } else {
    next()
  }
});

// @desc Middleware for checking if customer is admin
const admin = (req, res, next) => {
  if (req.customer && req.customer.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
export { protect, admin };
