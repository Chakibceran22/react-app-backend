// 1. Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { config } from 'dotenv';
import cors from 'cors';
const MONGO_URI = "mongodb+srv://trondio466:e8MKzhYXu19KjXZJ@test.fkyx9.mongodb.net/myDataBase";
import handler from "./api/signeup.js";

// 2. Initialize the app and load environment variables
config(); // Load .env file into process.env
const app = express();

// 3. Middleware
app.use(express.json()); // For parsing JSON
app.use(cors()); // Enable CORS for cross-origin requests

// 4. MongoDB connection using Mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// 5. Define API routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from API!' });
});
app.get('/', (req, res) => {
    res.send("Hello from the server");
    });
    app.get("/api/signeup", handler);
// Add additional routes, e.g., app.use('/api/users', userRoutes);

// 6. Serve static files in production (for full-stack apps with React)
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve(); // Get the current directory
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Catch-all route to serve the React frontend for non-API requests
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// 7. Start the server
const PORT = process.env.PORT || 5000; // Railway sets process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
