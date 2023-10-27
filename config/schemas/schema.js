const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username : {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: '',
        enum: ['admin','user']
    }
  },{
    versionKey: false
  });

const User = mongoose.model('User', userSchema);
  
const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  priority: {type: String, required : true, enum: ['high', 'medium', 'low']},
  status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started'},
  maker : {type: String},
  dueDate: { type: Date }, 
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {User, Task};
