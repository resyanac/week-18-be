const express = require('express');
const {authRole, adminAuth} = require('../middlewares/roleAccess');
const fetchRoutes = express.Router();
const {
  fetchTasks
} = require('../controllers/taskController'); // Import your task controllers here

// Update a task's status
fetchRoutes.get('/task/',authRole, fetchTasks); // Soft delete a task

module.exports = fetchRoutes;
