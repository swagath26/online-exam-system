const mongoose = require('mongoose');
const config = require('./keys');

const connectDB = async () => {
  try {
    console.log("MongoDB URI:", config.MONGO_URI); // Add this line
    await mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;