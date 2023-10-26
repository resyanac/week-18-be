const express = require('express');
const { register, login } = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
// router.post('/logout', logout);

module.exports = userRoutes;
