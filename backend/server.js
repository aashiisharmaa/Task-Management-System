
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load .env variables

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ MongoDB Connection (MongoDB Atlas)
const mongoURI = process.env.MONGODB_URI;

// mongoose.connect(mongoURI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//  serverSelectionTimeoutMS: 5000,
//  socketTimeoutMS: 45000,
// })
mongoose.connect(mongoURI) 
.then(() => {
 console.log('✅ MongoDB connected successfully');

 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
 console.log(`🚀 Server running on http://localhost:${PORT}`);
 });
})
.catch((err) => {
 console.error('❌ MongoDB connection error:', err.message);
});