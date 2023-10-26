const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const authRole = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.role = decodedToken.role;

      if (decodedToken.role === 'admin' || decodedToken.role === 'user') {
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.log('Error updating user:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while authorizing',
      });
    }
  }
};

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      if (decodedToken.role === 'admin') {
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.log('Error updating user:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while authorizing',
      });
    }
  }
};

module.exports = { authRole, adminAuth };
