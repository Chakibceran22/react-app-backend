const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MONGOURL = 'mongodb+srv://trondio466:e8MKzhYXu19KjXZJ@test.fkyx9.mongodb.net/myDataBase';
const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a schema for user data
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // Note: Password should be hashed in a real application
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// API endpoint to handle signup requests
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
