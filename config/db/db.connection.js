const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // await mongoose.connect('mongodb+srv://resyanac:Resyaa21@cluster21.guz7tco.mongodb.net/?retryWrites=true&w=majority'
    await mongoose.connect('mongodb+srv://resyanac:Resyaa21@cluster21.guz7tco.mongodb.net/milestone?retryWrites=true&w=majority', { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('Connection to database failed', error);
    process.exit(1);
  }
};

module.exports = connectDB;
