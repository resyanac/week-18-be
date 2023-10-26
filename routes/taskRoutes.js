const express = require('express');
const {authRole, adminAuth} = require('../middlewares/roleAccess');
const taskRoutes = express.Router();
const {
  createTask,
  getAllTask,
  updateTask,
  getOneTask,
  deleteTask
} = require('../controllers/taskController'); // Import your task controllers here

// Define routes for task-related operations
taskRoutes.post('/tasks', authRole, createTask); // Create a new task
taskRoutes.get('/tasks', authRole, getAllTask); // Get all tasks
taskRoutes.get('/tasks/:id', authRole, getOneTask); // Get a single task by ID
taskRoutes.put('/tasks/:id', authRole, updateTask); // Update a task's status
taskRoutes.delete('/tasks/:id', adminAuth, deleteTask); // Soft delete a task

module.exports = taskRoutes;
