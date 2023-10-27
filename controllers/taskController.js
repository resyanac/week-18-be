const { Task } = require('../config/schemas/schema');
const { getToken, loginUser } = require('../middlewares/roleAccess');

const getAllTask = async (req, res) => {
  const decodedToken = await getToken(req)
  try {
    const {role, username } = loginUser(decodedToken)
    console.log(' decoded token:', decodedToken)
    console.log(role)
    console.log(username)
    const query = username ? {maker: username, isDeleted: false } : {isDeleted: false}
    if (role == 'admin'){
      const task = await Task.find({isDeleted:  false});
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved all tasks',
        data: task,
      });
    } 
    else if ( role == 'user') {
      const task = await Task.find({ maker : username, isDeleted: false})
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved user tasks',
        data: task,
      });
    }
    else {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized please login'
      })
    }
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
  try{
  const decodedToken = await getToken(req)
    if(!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Decoded Token Payload:', decodedToken)

    const { username } = loginUser(decodedToken)
    console.log('username:', username);

    const { task, priority, dueDate } = req.body; 
    const newTask = await Task.create({ task, priority, maker: username, dueDate });
    console.log(newTask); 
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
  const decodedToken = await getToken(req)
  const {status, dueDate}= req.body
  try {
    const {role, username } = loginUser(decodedToken)
    console.log(' decoded token:', decodedToken)
    console.log(role)
    console.log(username)
    const { id } = req.params;
    const task = await Task.findOne({_id : id})
    if ( task.maker == username) {
      const updatedTask = await Task.findByIdAndUpdate(id, {status : status, dueDate: dueDate});
      return res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: updatedTask,
      });
    } else if  (task.maker !== username) {
      return res.status(403).json({
        success: false,
        message: 'You are forbidden to update this task',
      });
    } 
    else {
      return res.status(400).json({
        success: false,
        message: 'Failed to update this task'
      })
    }
  } catch (err) {
    console.log('Error update transfer:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting transfer data or TransferId has the wrong format',
    });
  }
};


const deleteTask = async (req, res) => {
  const decodedToken = await getToken(req)
  try {
    const {role, username } = loginUser(decodedToken)
    console.log(' decoded token:', decodedToken)
    console.log(role)
    console.log(username)
    const { id } = req.params;
    const task = await Task.findOne({_id : id})
    console.log(task.maker)
    if ( task.maker == username) {
      const deletedTask = await Task.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });
      return res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        data: deletedTask,
      });
    } else if (task.maker !== username) {
      return res.status(403).json({
        success: false,
        message: 'You are forbidden to delete this task',
      });
    } 
    else {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete this task'
      })
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
