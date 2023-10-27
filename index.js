const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmetApp = require('./middlewares/helmet');
const connectDB = require('./config/db/db.connection');
const userRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const fetchRoutes = require('./routes/fetchRoutes');

const app = express();


helmetApp(app)

app.use(express.json());

app.use(
  cors({
    origin: ['https://revou-milestone-3.web.app', 'http://localhost:5173'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to ResyanaC rest API'
  });
});

app.use('/api/auth', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', fetchRoutes);

connectDB();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
