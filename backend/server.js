// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // User routes for authentication
const quizRoutes = require('./routes/quizRoutes'); // Quiz routes

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URI); // Log the MongoDB URI for verification
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process with failure
  }
};

// Create an instance of express
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to the database
connectDB();

// Define routes
app.use('/api/auth', authRoutes); // User-related routes
app.use('/api/quizzes', quizRoutes); // Quiz-related routes

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});