const { Task } = require('../config/schemas/schema');

const getAllTask = async (req, res) => {
  try {
    const task = await Task.find({});

    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved all tasks',
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Failed to retrieve tasks',
    });
  }
};

const getOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved task',
      user: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal server error while getting Task or Task ID has the wrong format',
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { task, dueDate } = req.body; 
    const newTask = await Task.create({ task, dueDate }); 

    return res.status(200).json({
      success: true,
      message: 'Task registration success',
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, dueDate } = req.body; 

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: { status, dueDate } }, 
      { new: true }
    );

    if (updatedTask) {
      return res.status(200).json({
        success: true,
        message: 'Successfully updated task',
        data: updatedTask,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
  } catch (error) {
    console.log('Error updating task:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the task or Task ID has the wrong format',
    });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });

    if (deletedTask) {
      return res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        data: deletedTask,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
  } catch (err) {
    console.log('Error soft deleting transfer:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting transfer data or TransferId has the wrong format',
    });
  }
};


const fetchTasks = async (req, res) => {
  try {
    const task = await Task.find({ isDeleted: false }); 
    return res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching tasks',
    });
  }
};



module.exports = { createTask, getAllTask, updateTask, getOneTask, deleteTask, fetchTasks };
