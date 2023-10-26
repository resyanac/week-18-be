const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../config/schemas/schema');
const { JWT_Sign } = require('../config/auth/jwt');

const app = express();
app.use(express.json());
require('dotenv').config(); // Load environment variables from .env file
// Load the secret key from environment variables



const register = async (req, res) => {
  try {
    const { _id, username, password, role } = req.body;

   const existingUser = await User.findOne({ username });
  
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists"
      });
    }
  
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({ _id, username, password: hashedPass, role });
    return res.status(200).json({
      success: true,
      message: "Registration success",
      data: newUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });

    console.log('User found in database:', user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    const loggedUser = req.body.username;
    const role = user.role;
    
    if (isPasswordCorrect) {
      const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, process.env.SECRET_KEY);
      return res.status(200).json({
        success: true,
        message: "User successfully logged in",
        user: loggedUser,
        role,
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}









module.exports = { register, login };
